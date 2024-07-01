import { errors } from "./errors.js";

const phoneNumberRegExp = /^0?\+?(98)?9\d{9}$/

export default function(phoneNumber){
    if(typeof phoneNumber !== "string") {
        throw new Error(errors.phoneNumber.incorrectType)
    }

    if(phoneNumber === "") {
        throw new Error(errors.phoneNumber.isEmpty)
    }

    if(phoneNumber.match(phoneNumberRegExp) === null) {
        throw new Error(errors.phoneNumber.incorrectValue)
    }

    const unifiedPhoneNumber = phoneNumber.replaceAll(/^0?\+?(98)?/g, "")

    return unifiedPhoneNumber
}