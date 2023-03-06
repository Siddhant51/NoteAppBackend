const User = require("./userSchema");

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ error: "Plz fill all fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ error: "User already exists" });
    } else {
      const user = new User({ name, email, password });
      // bcrypt middleware
      await user.save();
      res.status(200).json({ message: "User registered" });
    }
  } catch (err) {
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send({ user });
  } catch (err) {
    res.status(400).send(err);
  }
};

const Create = async (req, res) => {
  const { userId, title, description, color, font } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          notes: { title, description, color, font },
        },
      },
      { new: true }
    );
    res.send({ user });
  } catch (err) {
    res.status(400).send(err);
  }
};

const Notes = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    res.send(user.notes);
  } catch (err) {
    res.status(400).send(err);
  }
};

const Update = async (req, res) => {
  const { userId, noteId, title, description, color, font } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "notes._id": noteId },
      {
        $set: {
          "notes.$.title": title,
          "notes.$.description": description,
          "notes.$.color": color,
          "notes.$.font": font,
        },
      },
      { new: true }
    );
    res.send({ msg: "note updated" });
  } catch (err) {
    res.status(400).send(err);
  }
};

const Delete = async (req, res) => {
  const { userId, noteId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );
    res.send({ msg: "note deleted" });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { Register, Login, Create, Notes, Update, Delete };
