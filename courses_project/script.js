function coursesPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("viewCoursesPage").style.display = "block";

    getMethod();
}

function getMethod() {
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

            coursesList.style.display = 'flex';
            coursesList.style.flexWrap = 'wrap';
            coursesList.style.gap = '20px';
            coursesList.style.justifyContent = 'center';

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
                courseContainer.style.boxSizing = 'border-box';

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

function studentsPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("viewStudentsPage").style.display = "block";
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