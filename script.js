document.addEventListener("DOMContentLoaded", () => {
    displayAppointments();
});

const tableRef = document.getElementById("appoint-table").getElementsByTagName("tbody")[0];
const baseUrl = "https://crudcrud.com/api/07c859c4e62e4e33ab85d6e5a1918c33/appointment/";

function addAppoint(e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const emailid = document.getElementById("emailid");
    const phone_no = document.getElementById("phone_no");

    const nameVal = name.value.trim();
    const emailidVal = emailid.value.trim();
    const phone_noVal = phone_no.value.trim();

    if (nameVal === "" || emailidVal === "") {
        alert("Please enter both name and emailid.");
        return;
    }

    const patientDetail = {
        name: nameVal,
        emailid: emailidVal,
        phone_no: phone_noVal,
    };

    // console.log(patientDetail);

    // add to server
    axios
        .post(baseUrl, patientDetail)
        .then((res) => {
            displayAppointment(res.data);
        })
        .catch((err) => console.log(err));

    name.value = "";
    emailid.value = "";
    phone_no.value = "";
}

function displayAppointments() {
    axios
        .get(baseUrl)
        .then((appointments) => {
            console.log(appointments);
            appointments.data.forEach((appointment, index) => {
                const myHtmlContent = `
        <td>${appointment.name}</td>
        <td>${appointment.emailid}</td>
        <td>${appointment.phone_no}</td>
        <td><button class="btn btn-primary" onclick="deleteAppointment(${appointment._id})" >Edit</button><button onclick="updateAppointment(${appointment._id})" class="btn btn-danger m-3">delete</button></td>`;
                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.innerHTML = myHtmlContent;
            });
        })
        .catch((err) => console.log(err));
}
function displayAppointment(appointment) {
    const myHtmlContent = `
    <td>${appointment.name}</td>
    <td>${appointment.emailid}</td>
    <td>${appointment.phone_no}</td>
    <td><button class="btn btn-primary" onclick="deleteAppointment(${appointment._id})" >Edit</button><button onclick="updateAppointment(${appointment._id})" class="btn btn-danger m-3">delete</button></td>`;
    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
}
