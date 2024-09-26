const bcrypt = require("bcrypt");
const pool = require("./db");
const queries = require("./queries");
const SALT_ROUNDS = 10;

// GET all users
const getAllUsers = (req, res) => {
  pool.query(queries.getAllUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// GET all mentors - Route ( /api/mentors)
const getMentors = (req, res) => {
  pool.query(queries.getMentors, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// ADD new account- Route
const signup = async (req, res) => {
  const {
    email,
    userType,
    password,
    first_name,
    last_name,
    phone_number,
    linkedin,
    about_me,
    programming_language,
    photo,
  } = req.body;

  try {
    // Validation of the fields EMAIL, PASSWORD, PROGRAMMING LANGUAGE
    if (email.trim() == "" || userType.trim() == "" || password.trim() == "") {
      res.status(400).send({ error: "All field are required" });
      return;
    }
    if (!validateEmail(email)) {
      res.status(400).send({ error: "Invalid email" });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).send({ error: "Password must be at least 6 characters" });
      return;
    }

    if (userType == "mentor") {
      // check validation for mentor
      if (
        first_name.trim() == "" ||
        last_name.trim() == "" ||
        phone_number.trim() == "" ||
        linkedin.trim() == "" ||
        photo.trim() == "" ||
        programming_language.length === 0 // Check if array is empty
      ) {
        res.status(400).send({ error: "All field are required" });
        return;
      }
    }

    // check if email already exists
    const result = pool.query(queries.checkEmail, [email]);
    if ((await result).rows.length) {
      res.status(400).send({ error: "Email already exists" });
      return;
    } else {
      // add the user to the db
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await pool.query(queries.signup, [email, hashedPassword, userType]);

      // add the mentor details to the db
      if (userType == "mentor") {
        await pool.query(queries.createMentor, [
          email,
          first_name,
          last_name,
          phone_number,
          linkedin,
          about_me,
          photo,
        ]);
        programming_language.every((lang) =>
          pool.query(queries.addMentorLangs, [email, lang])
        );
      }

      res.status(200).json({ email, userType });
    }
  } catch (error) {
    throw error;
  }
};

// login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check validation
    if (email.trim() == "" || password.trim() == "") {
      res.status(400).send({ error: "Email or password are missing" });
      return;
    }

    const result = await pool.query(queries.login, [email]);

    if (result.rows.length === 0) {
      res.status(400).send({ error: "Email or password are incorrect" });
      return;
    } else {
      const storedPassword = result.rows[0].password;
      const isMatch = await bcrypt.compare(password, storedPassword);
      if (isMatch) {
        const user = {
          email: (await result).rows[0].email,
          userType: (await result).rows[0].usertype,
        };
        res.status(200).send(user);
      } else {
        res.status(400).send({ error: "Email or password are incorrect" });
      }
    }
  } catch (error) {
    throw error;
  }
};

// DELETE account - Route ( /api/mentors/:email)
const deleteMentor = async (req, res) => {
  const email = req.params.email;
  try {
    const emailChecked = pool.query(queries.checkEmail, [email]);
    if (!(await emailChecked).rows.length) {
      res.status(400).send({ error: "Email does not exist" });
      return;
    } else {
      await pool.query(queries.deleteMentor, [email]);
      await pool.query(queries.deleteMentorsFromUsers, [email]);
      res.status(200).send({ success: "Account deleted successfully" });
    }
  } catch (error) {
    throw error;
  }
};

// PUT mentor details- Route
const updateMentor = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    phone_number,
    linkedin,
    about_me,
    programming_language,
    photo,
  } = req.body;

  try {
    const emailChecked = pool.query(queries.checkEmail, [email]);
    if (!(await emailChecked).rows.length) {
      res.status(400).send({ error: "Email does not exist" });
      return;
    } else {
      await pool.query(queries.updateMentor, [
        first_name,
        last_name,
        phone_number,
        linkedin,
        about_me,
        photo,
        email,
      ]);
      if (programming_language) {
        pool.query(queries.addMentorLangs, [email, programming_language]);
      }
      res.status(200).send({ success: "Account updated successfully" });
    }
  } catch (error) {
    throw error;
  }
};

const getMentorDetailsByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await pool.query(queries.getMentorDetailsByEmail, [email]);
    if (user.rows.length === 0) {
      res.status(400).send({ error: "Error fetching mentor details" });
      return;
    }
    res.status(200).send(user.rows[0]);
  } catch (error) {
    throw error;
  }
};

// Delete mentee account
const deleteMentee = async (req, res) => {
  const email = req.params.email;
  try {
    const emailChecked = pool.query(queries.checkEmail, [email]);
    if (!(await emailChecked).rows.length) {
      res.status(400).send({ error: "Email does not exist" });
      return;
    } else {
      await pool.query(queries.deleteMentorsFromUsers, [email]);
      res.status(200).send({ success: "Account deleted successfully" });
    }
  } catch (error) {
    throw error;
  }
};

// validate email
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

//validate password
const validatePassword = (password) => {
  return password.length >= 6;
};

const searchMentors = async (req, res) => {
  const { searchWord } = req.params;

  try {
    const result = await pool.query(queries.searchMentors, [searchWord]);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getMessages = async (req, res) => {
  const recipient = req.params.email;

  try {
    const result = await pool.query(queries.getMessages, [recipient]);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (req, res) => {
  const { sender, message } = req.body;
  const recipient = req.params.email;

  try {
    const result = await pool.query(queries.sendMessage, [
      sender,
      recipient,
      message,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const deleteMessage = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(queries.deleteMessage, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getNumberMessages = async (req, res) => {
  const recipient = req.params.email;

  try {
    const result = await pool.query(queries.getNumberMessages, [recipient]);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMentors,
  signup,
  deleteMentor,
  updateMentor,
  getAllUsers,
  login,
  getMentorDetailsByEmail,
  deleteMentee,
  searchMentors,
  getMessages,
  sendMessage,
  deleteMessage,
  getNumberMessages,
};
