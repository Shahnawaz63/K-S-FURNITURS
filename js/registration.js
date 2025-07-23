const registerbutton = document.getElementById("registerbutton");
const loginbutton = document.getElementById("loginbutton");
const register = document.getElementById("register");
const login = document.getElementById("login");
const signup = document.getElementsByClassName("signup");
const signin = document.getElementsByClassName("btn signin");
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
    window.open("otp.html");
  }
}


function openotpin(){
  if(email.value==""||password.value==""){
alert("enter valid data");
  }
  else{
    window.open("otp.html")
  }
}


console.log(signin);
