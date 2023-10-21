const User = require("../models/users/userModel.js");
const database = require("./database.js");

const checkUserRoleParams = (permissions) => {
  return async (req, res, next) => {
    const userRole = await getUserRoles(req.params.id);
    if (userRole === undefined) {
      res.send("Kullanıcı bulunamadı");
    } else {
      if (permissions.includes(userRole[0].rol)) {
        next();
      } else {
        return res.status(403).json({ message: "Erişim reddedildi" });
      }
    }
  };
};

const getUserRoles = async (userId) => {
  await database.connect();
  try {
    const user = await User.find({ _id: userId });
    if (user.length !== 0) {
      return user;
    }
    await database.close();
  } catch (error) {
    await database.close();
    console.log("Hata");
  }
};

module.exports = { checkUserRoleParams };
