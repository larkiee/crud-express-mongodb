import {  User, Role} from "./models/index.js"
import passwordUtils from "./utils/password.js"

async function init(){
    const roleCount = await Role.countDocuments({}) 
    if(roleCount === 0){
        await Role.insertMany([
            {
                title: "regular user",
                isAdmin: false
            },
            {
                title: "admin user",
                isAdmin: true
            },
        ])
    }
    
    const adminRole = await Role.findOne({isAdmin: true}, {_id: 1})
    const passwordHash = await passwordUtils.generateHashFromPassword("Admin123#")
    await User.updateOne(
        {
            roleID: adminRole._id
        },
        {
            email: "raya@gmail.com",
            passwordHash
        },
        {
            upsert: true
        }
    )
}

await init()