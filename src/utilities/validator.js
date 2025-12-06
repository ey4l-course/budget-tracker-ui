// validators.js
export const validateId = (val) => {
  const id = val.split("").map(Number);
  let checksum = 0;

  for (let i = 0; i < 8; i++) {
    const factor = i % 2 === 0 ? 1 : 2;
    let product = id[i] * factor;
    if (product > 9) product -= 9;
    checksum += product;
  }

  return (checksum + id[8]) % 10 === 0;
};


export const validateUsername = (val) =>
  /^(?!.*\s)[a-zA-Z0-9._\-$^~]{1,20}$/.test(val);

export const checkPasswordRules = (val = "") => ({
  capital: /[A-Z]/.test(val),
  small: /[a-z]/.test(val),
  digit: /\d/.test(val),
  symbol: /[-!@#$%^&*()_./]/.test(val),
  length: val.length >= 8
});

export const validatePassword = (val) => {
  const rules = checkPasswordRules(val);
  return Object.values(rules).every(Boolean);
}

export const validateName = (val) =>
  /^(?=.{2,20}$)[a-zA-Z]{2,}(?: [a-zA-Z]{2,})?$/.test(val);

export const validateMobile = (val) =>
  /^[0-9]{9,10}$/.test(val);

export const validateMail = (val) =>
  /^[a-zA-Z][a-zA-Z0-9-_~+.]{0,44}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9-.]{0,13}[a-zA-Z0-9](\.[a-zA-Z]{2,3}){1,2}$/.test(val);

export const validateNumeric = (val) =>
  /^[0-9]{1,}$/.test(val);

export const validateZip = (val) =>
  /^[0-9]{5,7}$/.test(val);