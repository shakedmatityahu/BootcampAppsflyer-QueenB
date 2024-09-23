const bcrypt = require("bcrypt");
const pool = require("./db");
const queries = require("./queries");
const SALT_ROUNDS = 10;
const ALLWOED_LANGUAGES = ["Java", "Python", "JavaScript", "C++", "GO"];

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

// check if already email exists
const checkEmail = async (email) => {
  try {
    const result = await pool.query(queries.checkEmail, [email]);
    return result.rows.length;
  } catch (error) {
    throw error;
  }
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
    programming_language,
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

    if (!validateProgrammingLanguage(programming_language)) {
      res.status(400).send({ error: "Invalid programming language" });
      return;
    }

    if (userType == "mentor") {
      // check validation for mentor
      if (
        first_name.trim() == "" ||
        last_name.trim() == "" ||
        phone_number.trim() == "" ||
        linkedin.trim() == "" ||
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
        ]);
        if (programming_language) {
          pool.query(queries.addMentorLangs, [email, programming_language]);
        }
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
    programming_language,
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

const validateProgrammingLanguage = (programming_language) => {
  // Check if it's an array
  if (!Array.isArray(programming_language)) {
    return false; // Not an array, invalid input
  }

  // Check if every language in the array is valid
  return programming_language.every((lang) =>
    ALLWOED_LANGUAGES.includes(lang)
  );
};

const searchMentors = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const query = `
      SELECT * FROM mentors 
      WHERE LOWER(first_name) LIKE LOWER($1) 
      OR LOWER(last_name) LIKE LOWER($1) 
      OR LOWER(email) LIKE LOWER($1) 
      OR phone_number LIKE $1 
      OR programming_languages::text ILIKE $1
    `;
    const values = [`%${searchTerm}%`];  // Search term is case-insensitive
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(200).json([]); // Return empty array if no mentors found
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send({ error: "Error searching for mentors" });
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
  searchMentors,  // Export searchMentors
};
