// Event listener for the form submission
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

    // Get form input values
    let studentName = document.getElementById('studentName').value;
    let studentID = document.getElementById('studentID').value;
    let email = document.getElementById('email').value;
    let contactNo = document.getElementById('contactNo').value;

    // Validate the form inputs
    if (validateForm(studentName, studentID, email, contactNo)) {
        // Retrieve existing students from local storage or initialize an empty array
        let students = JSON.parse(localStorage.getItem('students')) || [];
        // Add new student data to the array
        students.push({ studentName, studentID, email, contactNo });
        // Save updated student data back to local storage
        localStorage.setItem('students', JSON.stringify(students));

        // Refresh the display of student records
        displayStudents();
        // Reset the form for new entry
        this.reset();
    }
});

// Function to display students in the table
function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || []; // Retrieve students from local storage
    let studentsTable = document.querySelector('#studentsTable tbody'); // Select the table body
    studentsTable.innerHTML = ''; // Clear the current table content

    // Loop through each student and add a row to the table
    students.forEach((student, index) => {
        let row = studentsTable.insertRow(); // Create a new row
        row.insertCell(0).textContent = student.studentName; // Insert name
        row.insertCell(1).textContent = student.studentID; // Insert ID
        row.insertCell(2).textContent = student.email; // Insert email
        row.insertCell(3).textContent = student.contactNo; // Insert contact number
        
        // Insert action buttons for editing and deleting
        let actionsCell = row.insertCell(4);
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editStudent(index);
        actionsCell.appendChild(editBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteStudent(index);
        actionsCell.appendChild(deleteBtn);

        // Add a fade-in effect for new rows
        row.style.opacity = 0;
        setTimeout(() => {
            row.style.opacity = 1;
            row.style.transition = 'opacity 0.5s';
        }, 0);
    });
}

// Function to edit a student's details
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')); // Retrieve students from local storage
    let student = students[index]; // Get the selected student's details

    // Populate the form with the student's existing details
    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contactNo;

    deleteStudent(index); // Delete the student record temporarily to allow updating
}

// Function to delete a student record
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')); // Retrieve students from local storage
    students.splice(index, 1); // Remove the selected student from the array
    localStorage.setItem('students', JSON.stringify(students)); // Save the updated list back to local storage
    displayStudents(); // Refresh the display of student records
}

// Function to validate the form inputs
function validateForm(studentName, studentID, email, contactNo) {
    // Check if any fields are empty
    if (studentName.trim() === '' || studentID.trim() === '' || email.trim() === '' || contactNo.trim() === '') {
        alert('All fields are required.');
        return false;
    }
    // Check if student ID and contact number are numeric
    if (!/^\d+$/.test(studentID) || !/^\d+$/.test(contactNo)) {
        alert('Student ID and Contact No must be numeric.');
        return false;
    }
    // Check if student name contains only characters
    if (!/^[a-zA-Z ]+$/.test(studentName)) {
        alert('Student Name should only contain characters.');
        return false;
    }
    // Check if the email format is valid
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email.');
        return false;
    }
    return true; // If all validations pass, return true
}

// Display student records when the page loads
document.addEventListener('DOMContentLoaded', displayStudents);
