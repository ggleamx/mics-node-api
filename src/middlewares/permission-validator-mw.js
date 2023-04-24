const Response = require("../models/response-model");

const permissionValidator = (permission) => {
  return async (req, res, next) => {
    const { type, permissions } = req.payload;

    if (type === "SERVICE") {
      const permissionList = permissions.split(",");
      if (!permissionList.includes(permission)) {
        return res.status(401).json(new Response(true,'Access Denied'));
      }
    }
    next();
  };
};

module.exports = permissionValidator;
