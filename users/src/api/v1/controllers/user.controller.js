import UserService from "../services/user.service.js";

const service = new UserService();

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await service
      .registerUser(user)
      .catch((error) => next(error));
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service
      .loginUser(email, password)
      .catch((error) => next(error));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers().catch((error) => next(error));
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export { register, login, getUsers };
