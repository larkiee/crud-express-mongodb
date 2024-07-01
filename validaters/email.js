import { errors } from "./errors.js"

const emailRegExp = /^\w[\w\d]{2,}@\w{2,}\.\w{2,}$/

export default function(email) {
    if(typeof email !== "string"){
        throw new Error(errors.email.incorrectType)
    }
    
    if(email === ""){
        throw new Error(errors.email.isEmpty)
    }

    if(email.match(emailRegExp) === null){
        throw new Error(errors.email.incorrectValue)
    }
}