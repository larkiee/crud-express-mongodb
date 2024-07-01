import passportJWT from "passport-jwt"
import fs from "fs"

const JWTSterategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

import { ObjectId } from "mongodb"
import { userRepository } from "../repositories/index.js"

const pubKey = fs.readFileSync(`${process.cwd()}/rsa_pub.pem`, "utf8")

const JWTOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: pubKey,
    algorithms: ["RS256"]
}

const sterategy = new JWTSterategy(JWTOptions, (payload, done) => {
    const userID = new ObjectId(payload.sub)
    userRepository.getByID(userID, true)
        .then(res => {
            console.log({res});
            if(res?.found){
                delete res.user.passwordHash
                delete res.user.roleID
                done(null, res.user)
            }else{
                done(null, false)
            }
        })
        .catch(err => {
            done(err, null)
        })
})

export default function(passport){
    passport.use(sterategy)
}