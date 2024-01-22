const baseUrl = "https://crudcrud.com/api/07c859c4e62e4e33ab85d6e5a1918c33/appointment/";
function addExpense(e) {

  e.preventDefault();

  const name = document.getElementById("name");
  const emailid = document.getElementById("emailid");
  const phone_no = document.getElementById("phone_no");

  const nameVal =name.value.trim();
  const emailidVal =emailid.value.trim();
  const phone_noVal =phone_no.value.trim();

  if (nameVal === "" || emailidVal === "") {
    alert("Please enter both name and emailid.");
    return;
  }

  const patientDetail = {
    name: nameVal,
    emailid: emailidVal,
    phone_no: phone_noVal,
  };

console.log(patientDetail);

  // add to server
  axios
    .post(baseUrl, patientDetail)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    name.value ="";
    emailid.value ="";
    phone_no.value = "";

}
