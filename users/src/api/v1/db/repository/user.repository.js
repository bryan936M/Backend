import UserModel from "../models/User.model.js";

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  addUser(user) {
    const newUser = new this.model(user);
    return newUser.save();
  }

  getUserByEmail(email) {
    return this.model.findOne({ email });
  }

  getUser(id) {
    return this.model.findById(id);
  }

  getUsers() {
    return this.model.find();
  }

  updateUser(id, user) {
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }

  deleteUser(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default UserRepository;
