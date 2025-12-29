// formConfig
import { validateMail, validateId, validatePassword,validateMobile, validateName, validateNumeric, validateUsername, validateZip } from "../utilities/validator.js"
export const formFields = 
[
    {name: "id", type: "text", validator: validateId, placeholder: "id"},
    {name: "username", type: "text", validator: validateUsername, placeholder: "username"},
    {name: "password", type: "password", validator: validatePassword, placeholder: "password"},
    {name: "givenName", type: "text", validator: validateName, placeholder: "givenName"},
    {name: "surname", type: "text", validator: validateName, placeholder: "surname"},
    {name: "mobile", type: "tel", validator: validateMobile, placeholder: "mobile"},
    {name: "email", type: "email", validator: validateMail, placeholder: "email"},
    {name: "state", type: "text", validator: validateName, placeholder: "state"},
    {name: "city", type: "text", validator: validateName, placeholder: "city"},
    {name: "street", type: "text", validator: validateName, placeholder: "street"},
    {name: "house", type: "text", validator: validateNumeric, placeholder: "house"},
    {name: "apartment", type: "text", validator: validateNumeric, placeholder: "apartment (if N/A enter 0)"},
    {name: "zipcode", type: "text", validator: validateZip, placeholder: "zipcode"}
]