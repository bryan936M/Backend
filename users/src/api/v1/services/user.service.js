import { BadRequestError } from "../../../utils/ErrorHandling/App-errors.js";
import {
  encryptPassword,
  comparePassword,
  generateToken,
} from "../../../utils/Auth/index.js";
import UserRepository from "../db/repository/user.repository.js";
import devConfig from "../../../config/dev.config.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(user) {
    const { name, email, password, role } = user;

    if (!name || !email || !password || !role) {
      throw new BadRequestError("Email, name, password and role are required");
    }

    // Check if user with email already exists
    const existingUser = await this.getUserByEmail(user.email);

    if (existingUser) {
      throw new BadRequestError("User with email already exists");
    }

    // Encrypt password
    const hashedPassword = encryptPassword(password);

    return this.repository.addUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async loginUser(email, password) {
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    if (!comparePassword(password, user.password)) {
      throw new BadRequestError("Wrong email or password");
    }

    const token = await generateToken(
      email,
      user.role,
      devConfig.ACCESS_TOKEN_SECRET,
      "1hr"
    );

    return { user, token };
  }

  async getUsers() {
    return this.repository.getUsers().catch((error) => next(error));
  }

  async getUser(id) {
    return this.repository.getUser(id);
  }

  async getUserByEmail(email) {
    return this.repository.getUserByEmail(email);
  }

  async updateUser(id, user) {
    return this.repository.updateUser(id, user);
  }

  async deleteUser(id) {
    return this.repository.deleteUser(id);
  }
}

export default UserService;
