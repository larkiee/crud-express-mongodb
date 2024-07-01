import express from "express";
import validators from "../validaters/index.js";
import passwordUtils from "../utils/password.js";
import jwtUtils from "../utils/jwt.js";
import { userRepository } from "../repositories/index.js";
import { roleRepository } from "../repositories/index.js";
import passport from "passport";
import middlewares from "../middlewares/index.js";

const users = express.Router();

users.post("/", async (req, res, next) => {
  try {
    let { email, phoneNumber, firstName, lastName, password } = req.body;
    try {
      validators.validateEmail(email);
      phoneNumber = validators.validatePhone(phoneNumber);
      validators.validateName(firstName, "firstName");
      validators.validateName(lastName, "lastName");
      validators.validatePassword(password);
    } catch (err) {
      res.status(400);
      res.send({
        success: false,
        message: err.message,
      });
      return;
    }
    const { found } = await userRepository.getByEmailOrPhoneNumber(
      email,
      phoneNumber
    );
    if (found) {
      res.status(400);
      res.send({
        success: false,
        message: "phone or email is alredy existed",
      });
      return;
    }
    const passwordHash = await passwordUtils.generateHashFromPassword(password);
    const userRoleID = await roleRepository.getUserRoleID();
    const user = await userRepository.create({
      email,
      phoneNumber,
      firstName,
      lastName,
      passwordHash,
      roleID: userRoleID,
    });
    console.log("Here...");
    const { token, expiresAt } = jwtUtils.issueToken(user?._id.toString());
    res.status(201);
    res.send({
      success: true,
      token,
      expiresAt,
    });
  } catch (err) {
    console.log("Err", err);
    next(err);
  }
});

users.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    try {
      validators.validateEmail(email);
      validators.validatePassword(password);
    } catch (err) {
      res.status(400);
      res.send({
        success: false,
        message: err.message,
      });
      return;
    }
    const userRes = await userRepository.getByEmailOrPhoneNumber(email);
    console.log("Here....");
    if (!userRes.found) {
      res.status(400);
      res.send({
        success: false,
        message: "user not found",
      });
      return;
    }
    const valid = await passwordUtils.compareHashAndPassword(
      password,
      userRes.user.passwordHash
    );
    if (valid) {
      const { token, expiresAt } = jwtUtils.issueToken(
        userRes.user._id.toString()
      );
      res.send({
        success: true,
        token,
        expiresAt,
      });
      return;
    } else {
      res.status(400);
      res.send({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

users.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  middlewares.checkAdminAndUserPrivilege,
  (req, res, next) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

users.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  middlewares.checkAdminAndUserPrivilege,
  async (req, res, next) => {
    try {
      if (!req.user?._id) {
        res.status(404);
        res.send({
          success: false,
          message: "user not found",
        });
        return;
      }
      const updateObject = {};
      for (const field in req.body) {
        try {
          switch (field) {
            case "email":
              validators.validateEmail(req.body.email);
              updateObject["email"] = req.body.email;
              break;
            case "phoneNumber":
              const phoneNumber = validators.validatePhone(
                req.body.phoneNumber
              );
              updateObject["phoneNumber"] = phoneNumber;
              break;
            case "firstName":
              validators.validateName(req.body.firstName, "firstName");
              updateObject["firstName"] = req.body.firstName;
              break;
            case "lastName":
              validators.validateName(req.body.lastName, "lastName");
              updateObject["lastName"] = req.body.lastName;
              break;
            case "password":
              validators.validatePassword(req.body.password);
              updateObject["password"] = req.body.password;
              break;
          }
        } catch (err) {
          res.status(400);
          res.send({
            success: false,
            message: err.message,
          });
          return;
        }
        if (updateObject.password) {
          const hash = await passwordUtils.generateHashFromPassword(
            updateObject.password
          );
          delete updateObject.password;
          updateObject.passwordHash = hash;
        }
        await userRepository.update(req.user._id, updateObject);
        res.send({
          success: true,
          message: "operation done successfully",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

users.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  middlewares.checkAdminAndUserPrivilege,
  async (req, res, next) => {
    try {
      if (!req.user?._id) {
        res.status(404);
        res.send({
          success: false,
          message: "user not found",
        });
        return;
      }
      await userRepository.remove(req.user._id);
      res.send({
        success: true,
        message: "operation done successfully",
      });
    } catch (err) {
      next(err);
    }
  }
);

users.get(
    "/", 
    passport.authenticate("jwt", { session: false }),
    middlewares.checkAdminPrivilege, 
    async(req, res, next) => {
        try{
            const {email, phoneNumber, firstName, lastName, sortByDate, isAsc, page, count} = req.body
            const userListRes = await userRepository.getAll({email, phoneNumber, firstName, lastName, sortByDate, isAsc, page, count})
            res.send(userListRes)
        }catch(err){
            next(err)
        }
    });

export { users as usersRouter };
