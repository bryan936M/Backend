import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const encryptPassword = (readablePassword) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(readablePassword, salt);
};

const comparePassword = (readablePassword, encryptedPassword) => {
    return bcrypt.compareSync(readablePassword, encryptedPassword);
};

const generateToken = async (email, role, secret, period) => {
  return jwt.sign({ email, role }, secret, { expiresIn: period });
};

export { encryptPassword, comparePassword, generateToken };
