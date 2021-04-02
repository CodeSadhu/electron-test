const fs = require('fs');

var fileArray = [
  './file_list/file1.pdf',
  './file_list/file2.pdf',
  './file_list/file3.pdf',
];

function signIn() {
  const rpi_id = document.getElementById("rpi");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  let signInObject = {};

  const ip_address = results["Wi-Fi"][0];

  signInObject["username"] = username.value;
  signInObject["password"] = password.value;
  signInObject["rpi_id"] = rpi_id.value;
  signInObject["ip_address"] = ip_address;
  if (username.value === "guest" || username.value === "Guest" || username.value === "GUEST") {
    signInObject["can_access"] = fileArray;
  }

  signInObject = JSON.stringify(signInObject);
  console.log(signInObject);
  fs.writeFileSync("signInCredentials.txt", signInObject, "utf-8");
}

function signUp() {
  const rpi_id = document.getElementById("signUpRpi");
  const username = document.getElementById("signUpUsername");
  const password = document.getElementById("signUpPassword");

  let signUpObject = {};

  const ip_address = results["Wi-Fi"][0];

  signUpObject["username"] = username.value;
  signUpObject["password"] = password.value;
  signUpObject["rpi_id"] = rpi_id.value;
  signUpObject["ip_address"] = ip_address;
  // if (username.value === "guest" || username.value === "Guest" || username.value === "GUEST") {
  //   signUpObject["can_access"] = fileArray;
  // }

  signUpObject = JSON.stringify(signUpObject);
  console.log(signUpObject);
  fs.appendFileSync("signUpCredentials.txt", signUpObject, "utf-8");
}