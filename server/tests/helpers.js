const { User } = require("../models/user.model");

module.exports = {
  createUser: async () => {
    const payload = {
      name: "test",
      email: "test@continious.com",
      password: "idk",
    };
    let user = await User.findOne({
      where: { email: payload.email },
    });
    if (!user) {
      user = await User.create(payload);
      await user.save();
    }

    return { user };
  },
};
