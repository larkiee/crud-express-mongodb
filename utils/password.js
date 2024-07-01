import bcrypt from "bcrypt"

const roundSalt = 10

async function generateHashFromPassword(password){
    const hash = await bcrypt.hash(password, roundSalt)
    return hash
}

async function compareHashAndPassword(password, hash){
    const valid = await bcrypt.compare(password, hash)
    return valid
}

export default {
    generateHashFromPassword,
    compareHashAndPassword
}