import { Role } from "../models/index.js";


class RoleRepository {
    async getAdminRoleID(){
        const role = await Role.findOne(
            {isAdmin: true},
            {_id: 1}
        )
        return role?._id
    }

    async getUserRoleID(){
        const role = await Role.findOne(
            {isAdmin: false},
            {_id: 1}
        )
        return role?._id
    }
}

const roleInstance = new RoleRepository()

export default roleInstance