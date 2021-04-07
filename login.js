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

  // var encryptedPass = CryptoJS.TripleDES.encrypt(signUpPassword.value, signUpRpi.value);
  // var decryptedPass = CryptoJS.TripleDES.decrypt(encryptedPass, signUpRpi.value);

  var key = CryptoJS.enc.Base64.parse(signUpRpi.value.toUppercase());
  var iv = CryptoJS.enc.Base64.parse('');
  var encryptedPass = CryptoJS.AES.encrypt(signUpPassword.value, key, {iv: iv});
  // encryptedPass = encryptedPass.toString();
  var decryptedPass = CryptoJS.AES.decrypt(encryptedPass, key, {iv: iv});
  decryptedPass = decryptedPass.toString(CryptoJS.enc.Utf8);
  // var encryptedPass = CryptoJS.SHA256(signUpPassword.value, signUpRpi.value);

  signUpObject["username"] = signUpUsername.value;
  signUpObject["password"] = encryptedPass.toString();
  signUpObject["rpi_id"] = signUpRpi.value;
  signUpObject["ip_address"] = ip_address;
  signUpObject["decrypted"] = decryptedPass;
  
  console.log(encryptedPass);
  console.log(signUpObject);
  fs.appendFileSync("signUpCredentials.txt", JSON.stringify(signUpObject), "utf-8");
}