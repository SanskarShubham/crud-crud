document.addEventListener("DOMContentLoaded", () => {
      displayAppointments();
});

const tableRef = document.getElementById("appoint-table").getElementsByTagName("tbody")[0];
const baseUrl = "https://crudcrud.com/api/f99fd699985748c6bc3984cf4a5d0497/appointment/";

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
            // console.log(appointments);
            appointments.data.forEach((appointment, index) => {
                const myHtmlContent = `
        <td>${appointment.name}</td>
        <td>${appointment.emailid}</td>
        <td>${appointment.phone_no}</td>
        <td><button onclick="updateAppointment('${appointment._id}',event)" class="btn btn-primary m-3">Edit</button><button class="btn btn-danger removeConditionBtn" onclick="deleteAppointment('${appointment._id}',event)" >delete</button></td>`;
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
    <td><button onclick="updateAppointment('${appointment._id}',event)" class="btn btn-primary m-3">Edit</button><button class="btn btn-danger removeConditionBtn" onclick="deleteAppointment('${appointment._id}',event)" >delete</button></td>`;
    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
}
function deleteAppointment(id, e) {
    const confirmRes = confirm("Are you sure want to delete ?")
    if (!confirmRes) {
        return;
    }
    axios
        .delete(baseUrl + id)
        .then((res) => {
            if (res.status === 200) {

                // event.target will be the input element.
                var td = e.target.parentNode;
                var tr = td.parentNode; // the row to be removed
                tr.parentNode.removeChild(tr);
            }


        })
        .catch((err) => console.log(err));

}

function updateAppointment(id) {
    axios
    .get(baseUrl + id)
    .then((res) => {
        if (res.status === 200) {

            const newName = prompt('Nmae:', res.data.name);
            const newEmailid = prompt('Email:', res.data.emailid);
            const newPhoneNO = prompt('Phone No:', res.data.phone_no);
            const patientDetail = {
                name:newName ,
                emailid:newEmailid ,
                phone_no:newPhoneNO ,
            };
            axios
    .put(baseUrl+id,patientDetail)
    .then((res) => {
        if (res.status === 200) {
            location.reload();
        }
    })
    .catch((err) => console.log(err));
        }


    });
    

   


}
