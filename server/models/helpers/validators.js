
const notEmpty = (name) => {
  return name.trim().length > 0;
};

const emailValid = (email) => {
  let pattern = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
  return pattern.test(email);
};

export { notEmpty, emailValid }