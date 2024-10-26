import cv2
from ultralytics import YOLO
import easyocr
import firebase_admin
from firebase_admin import credentials, firestore


reader = easyocr.Reader(['en'])


model = YOLO('best.pt')  


cred = credentials.Certificate(r'license.json') 
firebase_admin.initialize_app(cred)
db = firestore.client()

cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()
    
    if not success:
        print("Failed to grab frame")
        break
    results = model(frame)
    for result in results:
        for bbox in result.boxes:
            x1, y1, x2, y2 = map(int, bbox.xyxy[0])

            detected_region = frame[y1:y2, x1:x2]

            ocr_result = reader.readtext(detected_region)

            # Draw the bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Annotate the frame with extracted text
            if ocr_result:
                extracted_text = ocr_result[0][-2].upper().replace(" ", "")  # Remove spaces from the extracted text
                cv2.putText(frame, extracted_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

                # Flag to determine if the vehicle is authorized
                is_authorized = False

                # Query the entire Vehicle collection
                vehicles_ref = db.collection('Vehicle')
                docs = vehicles_ref.stream()

                for doc in docs:
                    data = doc.to_dict()
                    primary_vehicle = data.get('primaryVehicle').replace(" ", "")
                    secondary_vehicle = data.get('secondaryVehicle').replace(" ", "")

                    # Print the primary and secondary vehicle numbers
                    print(f"Document ID: {doc.id}")
                    print(f"Primary Vehicle: {primary_vehicle}")
                    print(f"Secondary Vehicle: {secondary_vehicle}")

                    # Check if the extracted text matches either primary or secondary vehicle
                    if extracted_text == primary_vehicle or extracted_text == secondary_vehicle:
                        # If a match is found, set the flag and store in 'Authorized' collection
                        is_authorized = True
                        db.collection('Authorized').add({'vehicle_number': extracted_text})
                        print(f"Authorized vehicle: {extracted_text}")
                        break  # No need to continue checking other documents if a match is found

                if not is_authorized:
                    # If no match is found, store in 'Unauthorized' collection
                    db.collection('Unauthorized').add({'vehicle_number': extracted_text})
                    print(f"Unauthorized vehicle: {extracted_text}")

    # Display the frame with detections and OCR annotations
    cv2.imshow("YOLOv8 Real-Time Detection with OCR", frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close any OpenCV windows
cap.release()
cv2.destroyAllWindows()
