const registerbutton = document.getElementById("registerbutton");
const loginbutton = document.getElementById("loginbutton");
const register = document.getElementById("register");
const login = document.getElementById("login");
const signup = document.getElementsByClassName("signup");
const signin = document.querySelector(".btn.signin");
const fname = document.getElementById("fName");
const email = document.getElementById("Email");
const password = document.getElementById("password");

registerbutton.addEventListener("click", () => {
  login.style.display = "none";
  register.style.display = "block";
});

loginbutton.addEventListener("click", () => {
  register.style.display = "none";
  login.style.display = "block";
});

function openotp() {
  if (fname.value == "" || email.value == "" || password.value == "") {
    alert("enter data");
  } else {
    window.location.href="otp.html";
  }
}


function openotpin(){
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  if(loginEmail.value == "" || loginPassword.value == ""){
    alert("enter valid data");
  } else {
   window.location.href="otp.html";
  }
  console.log(loginEmail);
}


function shpass(){
 const loginPassword = document.getElementById("loginPassword");
 const icon=document.getElementById("lspass");
 const ricon=document.getElementById("rspass");
 if(loginPassword.type === "password" && password.type === "password"){
  loginPassword.type="text";
  password.type="text";
  icon.classList.remove("bi-eye-slash");
  icon.classList.add("bi-eye");
  ricon.classList.remove("bi-eye-slash");
  ricon.classList.add("bi-eye");
 }
 else{
  loginPassword.type="password";
  password.type="password";
   icon.classList.add("bi-eye-slash");
  icon.classList.remove("bi-eye");
  ricon.classList.add("bi-eye-slash");
  ricon.classList.remove("bi-eye");
 }
}


