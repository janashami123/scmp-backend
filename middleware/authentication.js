const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const Protect = async (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Couldnt Authenticate" });
  }

  let user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
  });
  if (user === null) {
    res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json(user);
};

module.exports = Protect;
