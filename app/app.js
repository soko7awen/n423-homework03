function initListeners() {

    $("#submit").on("click", (e) => {
        e.preventDefault();

        let fn = $("#firstName").val();
        let ln = $("#lastName").val();
        let ag = $("#age").val();
        let ph = $("#phone").val();
        let em = $("#email").val();
        let cs = $("#classes").val();

        let newArrClasses = cs.split(",").map((item) => item.trim());
        
        let studentObj = {
            fName: fn,
            lName: ln,
            age: ag,
            phone: ph,
            email: em,
            classes: newArrClasses
        }
        
        $("#firstName").val("");
        $("#lastName").val("");
        $("#age").val("");
        $("#phone").val("");
        $("#email").val("");
        $("#classes").val("");
        addStudent(studentObj);
    });

    $("#showStudents").on("click", () => {
        getStudents();
    });
}

function addStudent(student) {
    let allStudents = JSON.parse(localStorage.getItem("students"));
    allStudents.push(student);

    localStorage.setItem("students", JSON.stringify(allStudents));
}

function getStudents() {
    if ($("#printedStudents")) {
        $("#printedStudents").remove()
    }
    let allStudents = JSON.parse(localStorage.getItem("students"));
    let printedStudents = document.createElement("p");
    printedStudents.id = "printedStudents";
    $.each(allStudents, (index, student) => {
        let studentInfo = document.createElement("p");
        studentInfo.id = "studentInfo";
        let infoString = ""
        infoString += `First Name: ${student.fName} | Last Name: ${student.lName} | ${student.age} Years Old<br> Phone: ${student.phone} | Email: ${student.email}<br> Classes: `;
        
        $.each(student.classes, (i, cls) => {
            if (i === 0) {
                infoString += `<span>${cls}</span>`;
            } else {
                infoString += `, <span>${cls}</span>`;
            }
        })
        studentInfo.innerHTML = infoString;
        printedStudents.append(studentInfo);
    });
    $(".content").append(printedStudents);
}

function connectToStorage() {
    if (localStorage) {
        let students = localStorage.getItem("students");
        if (!students) {
            localStorage.setItem("students", JSON.stringify([]));
        }
    } else {
        console.log("Local storage not supported");
    }
}

$(document).ready(function () {
    connectToStorage();
    initListeners();
});