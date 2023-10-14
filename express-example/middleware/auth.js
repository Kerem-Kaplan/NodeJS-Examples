const authPage = (permission) => {
  return (req, res, next) => {
    const userRole = req.body.rol;
    if(permission.includes(userRole)){
      next()
    }else{
      return res.status(401).json({message:"İzin yok- Yetki yok"})
    }
  };
};

const authCourse = () => {};

module.exports = { authCourse, authPage };
