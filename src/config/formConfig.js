// formConfig
import { validateMail, validateId, validatePassword,validateMobile, validateName, validateNumeric, validateUsername, validateZip } from "../utilities/validator.js"

const addressFields =
{
    state: {type: "text", validator: validateName, placeholder: "state"},
    city: {type: "text", validator: validateName, placeholder: "city"},
    street: {type: "text", validator: validateName, placeholder: "street"},
    house: {type: "text", validator: validateNumeric, placeholder: "house"},
    apartment: {type: "text", validator: validateNumeric, placeholder: "apartment (if N/A enter 0)"},
    zipcode: {type: "text", validator: validateZip, placeholder: "zipcode"}
}

export const formFields = 
{
    id: {type: "text", validator: validateId, placeholder: "id"},
    username: {type: "text", validator: validateUsername, placeholder: "username"},
    password: {type: "password", validator: validatePassword, placeholder: "password"},
    givenName: {type: "text", validator: validateName, placeholder: "givenName"},
    surname: {type: "text", validator: validateName, placeholder: "surname"},
    mobile: {type: "tel", validator: validateMobile, placeholder: "mobile"},
    email: {type: "email", validator: validateMail, placeholder: "email"},
    address: addressFields
}