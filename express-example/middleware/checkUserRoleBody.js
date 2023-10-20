const sikayetci = require("../models/users/sikayetciModel.js");
const database = require("./database.js");

const checkUserRoleBody = (permissions) => {
  return async (req, res, next) => {
    console.log(req.body)
    if (req.body.sikayetciId === undefined) {
      const userRole = await getUserRoles(req.body.gozlemciId);
      if (userRole === undefined) {
        res.send("Kullanıcı bulunamadı");
      } else {
        if (permissions.includes(userRole[0].rol)) {
          next();
        } else {
          return res.status(403).json({ message: "Erişim reddedildi" });
        }
      }
    } else {
      const userRole = await getUserRoles(req.body.sikayetciId);
      if (userRole === undefined) {
        res.send("Kullanıcı bulunamadı");
      } else {
        if (permissions.includes(userRole[0].rol)) {
          next();
        } else {
          return res.status(403).json({ message: "Erişim reddedildi" });
        }
      }
    }
  };
};

const getUserRoles = async (userId) => {
  await database.connect();
  try {
    const userSikayetci = await sikayetci.find({ _id: userId });
    if (userSikayetci.length !== 0) {
      return userSikayetci;
    } else {
    }
    await database.close();
  } catch (error) {
    await database.close();
    console.log("Hata");
  }
};

module.exports = { checkUserRoleBody };
