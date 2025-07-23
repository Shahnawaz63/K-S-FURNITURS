const inpute = document.querySelectorAll("input");
const button = document.querySelector("button");

inpute.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    const currentinput = input;
    const nextinput = input.nextElementSibling;
    const previnput = input.previousElementSibling;

    if (currentinput.value.length > 1) {
      currentinput.value = "";
      return;
    }

    if (
      nextinput &&
      nextinput.hasAttribute("disabled") &&
      currentinput.value !== ""
    ) {
      nextinput.removeAttribute("disabled");
      nextinput.focus();
    }

    if (e.key === "Backspace") {
      inpute.forEach((input, index2) => {
        if (index1 <= index2 && previnput) {
          input.setAttribute("disabled", true);
          currentinput.value = "";
          previnput.focus();
        }
      });
    }

    if (!inpute[3].disabled && inpute[3].value !== "") {
      button.classList.add("active");

      return;
    }
    button.classList.remove("active");
  });
});

window.addEventListener("load", () => inpute[0].focus());

/* otp genrating and alert massage*/
function generator() {
  return Math.floor(Math.random() * 10);
}

const otpval = [];
for (let i = 0; i <= 3; i++) {
  otpval.push(generator());
}
alert(otpval.join(""));
console.log("Generated OTP:", otpval);

/* VERIFY */
function openindex() {
  const collectedValues = Array.from(inpute).map((input) => input.value);
  console.log("User Input:", collectedValues);

  function arrayEqual(array1, array2) {
    const result = [];
    for (let i = 0; i <= 3; i++) {
      if (array1[i] == array2[i]) {
        result.push(true);
      } else {
        result.push(false);
      }
    }
    return result;
  }

  const comparisonResult = arrayEqual(
    otpval.map(String), // convert numbers to strings
    collectedValues
  );

  console.log("Comparison:", comparisonResult);

  if (!comparisonResult.includes(false)) {
    window.open("index.html");
  } else {
    alert("Invalid OTP");
  }
}
