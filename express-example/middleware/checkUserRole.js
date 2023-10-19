const gozlemci = require("../models/users/gozlemciModel.js");
const sikayetci = require("../models/users/sikayetciModel.js");

const checkUserRole = async (req, res, next, role) => {
  try {
    const userRole = await getUserRoles(req.params.id);
    if (userRole[0].rol !== role) {
      res.status(403).send("Erişim reddedildi");
    }
  } catch (error) {
    res.status(500).send("Sunucu hatası");
  }
};

const getUserRoles = async (userId) => {
  try {
    const userGozlemci = await gozlemci.find({ _id: userId });
    const userSikayetci = await sikayetci.find({ _id: userId });
    if (userGozlemci.length !== 0) {
      return userGozlemci;
    }
    if (userSikayetci.length !== 0) {
      return userSikayetci;
    }
  } catch (error) {
    console.log("Hata");
  }
};

module.exports = { checkUserRole };
