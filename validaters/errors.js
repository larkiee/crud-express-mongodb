const errors = {
  email: {
    incorrectType: "email field has incorrect data type",
    isEmpty: "email field can't be empty",
    incorrectValue: "email field has incorrect value",
  },
  phoneNumber: {
    incorrectType: "phone number field has incorrect data type",
    isEmpty: "phone number field can't be empty",
    incorrectValue: "phone number field has incorrect value",
  },
  firstName: {
    incorrectType: "first name field has incorrect data type",
    isEmpty: "first name field can't be empty",
    incorrectValue: "first name field has incorrect value",
  },
  lastName: {
    incorrectType: "last name field has incorrect data type",
    isEmpty: "last name field can't be empty",
    incorrectValue: "last name field has incorrect value",
  },
  password: {
    incorrectType: "password field has incorrect data type",
    isEmpty: "password field can't be empty",
    incorrectCharcter: "password can only contains alphabetic, digits and puncuation characters",
    incorrectLength: "password must has atleast eight charcter length",
    mustHasUppercaseCharacter: "password must contains atleast one upper case character",
    mustHasLowercaseCharacter: "password must contains atleast one lower case character",
    mustHasPuntuationCharacter: "password must contains atleast one puntuation character",
    mustHasDigitCharcter: "password must contains atleast one digit character"
  },
};

export { errors };
