function coursesPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("viewCoursesPage").style.display = "block";
    
    getCourses();
}

function studentsPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("viewStudentsPage").style.display = "block";

    getStudents();
}

function addCoursePage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("addNewCoursePage").style.display = "block";
}

function addStudentPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("addNewStudentPage").style.display = "block";
}

function modifyCoursePage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("modifyCoursePage").style.display = "block";
}

function modifyStudentPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("modifyStudentPage").style.display = "block";
}

function deleteCoursePage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("deleteCoursePage").style.display = "block";
}

function deleteStudentPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("deleteStudentPage").style.display = "block";
}

function backToMainPage() {
    document.getElementById("mainPage").style.display = "block";
    document.getElementById("viewCoursesPage").style.display = "none";
    document.getElementById("viewStudentsPage").style.display = "none";
    document.getElementById("addNewCoursePage").style.display = "none";
    document.getElementById("addNewStudentPage").style.display = "none";
    document.getElementById("modifyCoursePage").style.display = "none";
    document.getElementById("modifyStudentPage").style.display = "none";
    document.getElementById("deleteCoursePage").style.display = "none";
    document.getElementById("deleteStudentPage").style.display = "none";
}

function getCourses() {
    fetch(`https://vvri.pythonanywhere.com/api/courses`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(json => {
            const coursesList = document.getElementById("coursesList");
            coursesList.innerHTML = '';

            if (json.length === 0) {
                const noCoursesMessage = document.createElement('p');
                noCoursesMessage.textContent = 'No courses available.';
                coursesList.appendChild(noCoursesMessage);
                return;
            }

            json.forEach(course => {
                const courseContainer = document.createElement('div');
                courseContainer.style.width = '30%';
                courseContainer.style.border = '1px solid #ccc';
                courseContainer.style.padding = '10px';
                courseContainer.style.borderRadius = '5px';
                courseContainer.style.flex = '0 1 calc(25% - 20px)';

                courseContainer.innerHTML = `
                    <p><strong>Course ID:</strong> ${course.id}</p>
                    <p><strong>Course Name:</strong> ${course.name}</p>
                `;

                if (course.students && course.students.length > 0) {
                    const studentHeader = document.createElement('p');
                    studentHeader.innerHTML = '<strong>Students:</strong>';
                    courseContainer.appendChild(studentHeader);

                    course.students.forEach(student => {
                        const studentDetails = document.createElement('p');
                        studentDetails.style.marginLeft = '20px';
                        
                        studentDetails.innerHTML = `<strong>Student ID:</strong> ${student.id}`;
                        courseContainer.appendChild(studentDetails);

                        const studentName = document.createElement('p');
                        studentName.style.marginLeft = '20px';
                        studentName.innerHTML = `<strong>Name:</strong> ${student.name}`;
                        courseContainer.appendChild(studentName);
                    });
                } else {
                    const noStudents = document.createElement('p');
                    noStudents.textContent = 'No students enrolled.';
                    courseContainer.appendChild(noStudents);
                }

                coursesList.appendChild(courseContainer);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            const coursesList = document.getElementById("coursesList");
            coursesList.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
        });
}

function getStudents() {
    fetch(`https://vvri.pythonanywhere.com/api/students`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(json => {
            const studentsList = document.getElementById("studentsList");
            studentsList.innerHTML = '';

            if (json.length === 0) {
                const noStudentsMessage = document.createElement('p');
                noStudentsMessage.textContent = 'No students available.';
                studentsList.appendChild(noStudentsMessage);
                return;
            }

            json.forEach(student => {
                const studentContainer = document.createElement('div');
                studentContainer.style.width = '30%';
                studentContainer.style.border = '1px solid #ccc';
                studentContainer.style.padding = '10px';
                studentContainer.style.borderRadius = '5px';
                studentContainer.style.flex = '0 1 calc(25% - 20px)'

                studentContainer.innerHTML = `
                    <p><strong>Student ID:</strong> ${student.id}</p>
                    <p><strong>Student Name:</strong> ${student.name}</p>
                `;

                studentsList.appendChild(studentContainer);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            const studentsList = document.getElementById("studentsList");
            studentsList.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
        });
}

function addCourse(event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value;

    if (courseName.trim() === "") {
        alert("Course name cannot be empty.");
        return;
    }

    fetch(`https://vvri.pythonanywhere.com/api/courses`, {
        method: "POST",
        body: JSON.stringify({
            name: courseName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add course. Please try again.");
        }
        return response.json();
    })
    .then(json => {
        console.log("Course added successfully:", json);
        alert("Course added successfully!");
        document.getElementById("courseName").value = "";
    })
    .catch(error => {
        console.error("Error adding course:", error);
        alert("Error adding course. Please try again.");
    });
}

function addStudent(event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const courseId = document.getElementById("courseId").value;

    if (studentName.trim() === "" || courseId.trim() === "") {
        alert("Student Name and Course ID cannot be empty.");
        return;
    }

    fetch(`https://vvri.pythonanywhere.com/api/students`, {
        method: "POST",
        body: JSON.stringify({
            name: studentName,
            course_id: parseInt(courseId, 10)
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add student. Please try again.");
        }
        return response.json();
    })
    .then(json => {
        console.log("Student added successfully:", json);
        alert("Student added successfully!");
        document.getElementById("studentName").value = "";
        document.getElementById("courseId").value = "";
    })
    .catch(error => {
        console.error("Error adding student:", error);
        alert("Error adding student. Please try again.");
    });
}