const fs = require('fs');
const CryptoJS = require('crypto-js');
const CircularJSON = require('flatted');

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
  const signUpRpi = document.getElementById("signUpRpi");
  const signUpUsername = document.getElementById("signUpUsername");
  const signUpPassword = document.getElementById("signUpPassword");

  let signUpObject = {};

  const ip_address = results["Wi-Fi"][0];

  var encryptedPass = CryptoJS.SHA256(signUpPassword.value);
  // var decryptedPass = CryptoJS.AES.decrypt(encryptedPass, signUpPassword.value);

  signUpObject["username"] = signUpUsername.value;
  signUpObject["password"] = encryptedPass;
  signUpObject["rpi_id"] = signUpRpi.value;
  signUpObject["ip_address"] = ip_address;
  
  console.log(signUpObject);
  fs.appendFileSync("signUpCredentials.txt", JSON.stringify(signUpObject), "utf-8");
}