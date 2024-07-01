import crypto from "crypto"
import fs from "fs"

function genKeyPair() {
    
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, 
        publicKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem' 
        },
        privateKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem'
        }
    })
    try{
        fs.statfsSync('rsa_pub.pem')
    }catch(e){
        if(e.code === "ENOENT"){
            fs.writeFileSync('rsa_pub.pem', keyPair.publicKey);
        }
    }
    
    try{
        fs.statSync("rsa_key.pem")
    }catch(e){
        if(e.code === "ENOENT"){
            fs.writeFileSync('rsa_key.pem', keyPair.privateKey);
        }
    }
}

genKeyPair();