import { errors } from "./errors.js";

const checkIncorrectCharacter = /^.*[^\w#\$%\^&\*\(\)\[\]]+.*$/u
const checkIncorrectLength = /^[\w#\$%\^&\*\(\)\[\]]{8,}$/u
const checkOneOrMoreUppercaseCharacter = /^.*[A-Z]+.*$/
const checkOneOrMoreLowercaseCharacter = /^.*[a-z]+.*$/
const checkOneOrMorePuncuationCharcter = /^.*[#\$%\^&\*\(\)\[\]].*$/u
const checkOneOrMoreDigitCharcter = /^.*\d.*$/

export default function(password){
    if(typeof password !== "string") {
        throw new Error(errors.password.incorrectType)
    }

    if(password === ""){
        throw new Error(errors.password.isEmpty)
    }

    if(password.match(checkIncorrectCharacter) !== null) {
        throw new Error(errors.password.incorrectCharcter)
    }

    if(password.match(checkIncorrectLength) === null) {
        throw new Error(errors.password.incorrectLength)
    }

    if(password.match(checkOneOrMoreUppercaseCharacter) === null) {
        throw new Error(errors.password.mustHasUppercaseCharacter)
    }

    if(password.match(checkOneOrMoreLowercaseCharacter) === null) {
        throw new Error(errors.password.mustHasLowercaseCharacter)
    }

    if(password.match(checkOneOrMorePuncuationCharcter) === null){
        throw new Error(errors.password.mustHasPuntuationCharacter)
    }

    if(password.match(checkOneOrMoreDigitCharcter) === null){
        throw new Error(errors.password.mustHasDigitCharcter)
    }
}