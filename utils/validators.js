function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassowrd
) => {
  const errors = {};
  if (username.trim() === "") errors.username = "username must not be empty";
  if (!validateEmail(email)) errors.email = "email is not valid";
  if (password.length < 8)
    errors.password = "password should at least have 8 characters";
  if (password !== confirmPassowrd)
    errors.confirmPassowrd = "password and confirmPassword must match";
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") errors.username = "username must not be empty";
  if (password.trim() === "") errors.password = "password must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
