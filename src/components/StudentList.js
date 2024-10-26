// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../Styles/StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'Vehicle'));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h1>STUDENT DETAILS</h1>
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>NAME</th>
            <th>ROLL NUMBER</th>
            <th>DEPARTMENT</th>
            <th>YEAR OF STUDY</th>
            <th>VEHICLE NUMBER (PRIMARY)</th>
            <th>VEHICLE NUMBER (SECONDARY)</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.dept}</td>
                <td>{student.year}</td>
                <td>{student.primaryVehicle}</td>
                <td>{student.secondaryVehicle}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
