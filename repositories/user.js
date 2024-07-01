import { User } from "../models/index.js";

class UserRepository {
  async create({
    email,
    phoneNumber,
    firstName,
    lastName,
    passwordHash,
    roleID,
  }) {
    const newUser = await User.create({
      email,
      phoneNumber,
      firstName,
      lastName,
      passwordHash,
      roleID,
    });
    return newUser;
  }

  async getByEmailOrPhoneNumber(
    email = "",
    phoneNumber = "",
    checkAdmin = false
  ) {
    let foundUser;
    if (checkAdmin) {
      const aggRes = await User.aggregate([
        {
          $match: {
            $or: [{ email: email }, { phoneNumber: phoneNumber }],
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            email: 1,
            phoneNumber: 1,
            firstName: 1,
            lastName: 1,
            passwordHash: 1,
            isAdmin: "$role.isAdmin",
          },
        },
      ]);
      foundUser = aggRes[0];
    } else {
      foundUser = await User.findOne({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
      });
    }
    if (!foundUser?._id) {
      return {
        found: false,
        user: null,
      };
    } else {
      return {
        found: true,
        user: foundUser,
      };
    }
  }

  async getByID(userID, checkAdmin = false) {
    let foundUser;

    if (checkAdmin) {
      const aggRes = await User.aggregate([
        {
          $match: {
            _id: userID,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "roleID",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $project: {
            email: 1,
            phoneNumber: 1,
            firstName: 1,
            lastName: 1,
            passwordHash: 1,
            isAdmin: "$role.isAdmin",
          },
        },
      ]);
      foundUser = aggRes[0];
    } else {
      foundUser = await User.findOne({ _id: userID });
    }

    if (!foundUser?._id) {
      return {
        found: false,
        user: null,
      };
    } else {
      return {
        found: true,
        user: foundUser,
      };
    }
  }

  async update(userID, updateObject) {
    const res = await User.updateOne({ _id: userID }, { ...updateObject });
    if (res.modifiedCount !== 1) {
      throw new Error("something unexpected happened in updating user");
    }
  }

  async remove(userID) {
    await User.deleteOne({ _id: userID });
  }

  async getAll({
    email = "",
    phoneNumber = "",
    firstName = "",
    lastName = "",
    sortByDate = false,
    isAsc = false,
    page = 1,
    count = 10,
  }) {
    const pipelines = [];
    const matchFilter = {
        $and: [
            {email: {$regex: new RegExp(email, "i")}},
            {phoneNumber: {$regex: new RegExp(phoneNumber, "i")}},
            {firstName: {$regex: new RegExp(firstName, "i")}},
            {lastName: {$regex: new RegExp(lastName, "i")}},
        ] 
    }
    const matchStage = { 
        $match: matchFilter
    };
    pipelines.push(matchStage)
    if(sortByDate){
        pipelines.push({
            $sort: {
                _id: isAsc ? 1 : -1
            }
        })
    }

    const paginationStages = [
        {
            $skip: (page - 1) * count
        },
        {
            $limit: count
        }
    ]

    pipelines.push(...paginationStages)

    const users = await User.aggregate([
        ...pipelines,
        {
            $project: {
                email: 1,
                phoneNumber: 1,
                firstName: 1,
                lastName: 1
            }
        }
    ])
    const userCount = await User.countDocuments(matchFilter)
    return {users, count: userCount}
  }
}

const userInstance = new UserRepository();

export default userInstance;
