import { errors } from "./errors.js";

const nameRegExp = /^[\w\u0600-\u06FF][\w\s\u0600-\u06FF]+$/u

export default function(name, fieldName){
    if(typeof name !== "string"){
        throw new Error(errors[fieldName].incorrectType)
    }

    if(name === ""){
        throw new Error(errors[fieldName].isEmpty)
    }

    if(name.match(nameRegExp) === null){
        throw new Error(errors[fieldName].incorrectValue)
    }
}