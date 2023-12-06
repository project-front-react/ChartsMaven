//regex
export let userNameRegex = /^[A-Za-z0-9_!@#$%^&*()-]+$/g;
// export let userNameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
// export let passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export let passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{8,16}$/;
export let emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export let mobileNoRegex = /^(\+\d{1,3}[- ]?)?\d{10}/;
export let mobileNoRegex = /^(\+\d{1,3}[- ]?)?\d{8,15}$/;

export let fullNameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
// export let fullNameRegex =  /^[A-Za-z\s]*$/;
export let otpRegex = /^\d{4}$/;

export const LoginValidation = (name, value, pass) => {
  //Condition
  switch (name) {
    case "username":
      if (!value) {
        return "Username is required";
      } else if (!value.match(userNameRegex)) {
        return "Invalid Username";
      } else {
        return "";
      }

    case "password":
      if (!value) {
        return "Password is required";
      } else if (!value.match(passwordRegex)) {
        return "Password must contains 8 character , One Uppercase, One lowercase, One special character and One number";
      } else {
        return "";
      }

    case "email":
      if (!value) {
        return "Email Id is required";
      } else if (!value.match(emailRegex)) {
        return "Please enter Valid Email Id";
      } else {
        return "";
      }

    case "mobileno":
      if (!value) {
        return "Mobile number is required";
      } else if (!value.match(mobileNoRegex)) {
        return "Please enter valid Mobile Number";
      } else {
        return "";
      }

    case "fullname":
      if (!value) {
        return "Full Name is required";
      } else if (!value.match(fullNameRegex)) {
        return "please enter Valid Name";
      } else {
        return "";
      }

    case "confirmPassword":
      if (!value) {
        return "Confirm Password is required";
      } else {
        return "";
      }

    case "text":
      if (!value) {
        return "Password is required";
      } else {
        return "";
      }
    default: {
      return "";
    }
  }
};
