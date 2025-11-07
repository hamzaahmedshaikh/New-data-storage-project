document.querySelector(".signup-btn").addEventListener("click", function (e) {
  e.preventDefault();

  var firstName = document
    .querySelectorAll(".name-row .input-field")[0]
    .value.trim();
  var surName = document
    .querySelectorAll(".name-row .input-field")[1]
    .value.trim();
  var date = document.querySelectorAll(".dob-row select")[0].value;
  var month = document.querySelectorAll(".dob-row select")[1].value;
  var year = document.querySelectorAll(".dob-row select")[2].value;
  var email = document.querySelectorAll(".full-width")[0].value.trim();
  var password = document.querySelectorAll(".full-width")[1].value;
  var genders = document.getElementsByName("gender");

  var gender = "";
  for (var i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      gender = genders[i].value;
      break;
    }
  }

  if (!firstName || !surName) return;
  if (!gender) return;
  if (password.length < 8) return;

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) return;

  var userData = {
    firstName: firstName,
    surName: surName,
    email: email,
    password: password,
    gender: gender,
    dob: date + "-" + month + "-" + year,
  };

  var users = JSON.parse(localStorage.getItem("usersData") || "[]");
  users.push(userData);
  localStorage.setItem("usersData", JSON.stringify(users));

  var inputs = document.querySelectorAll("input");
  for (var j = 0; j < inputs.length; j++) {
    if (inputs[j].type === "radio") inputs[j].checked = false;
    else inputs[j].value = "";
  }

  var selects = document.querySelectorAll("select");
  for (var k = 0; k < selects.length; k++) {
    selects[k].selectedIndex = 0;
  }

  window.location.href = "dash.html";
});
