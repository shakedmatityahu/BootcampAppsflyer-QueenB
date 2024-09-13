const pool = require('./db');
const queires = require('./queries');

// get all mentors
const getMentors = (req, res) => {
    pool.query(queires.getMentors, (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
    
    


//////// (below are optional) ////////

// check if already email exists


// create new account
const addMentor = async (req, res) => {
    const {email, first_name, last_name, phone_number, linkedin, programming_language} = req.body;
    try { 
        const emailChecked = await pool.query(queires.checkEmail, [req.body.email]);
        if (emailChecked.rows.length > 0) {
            res.status(400).send('Email already exists');
        }
        else {
            await pool.query(queires.createMentor, [email, first_name, last_name, phone_number, linkedin]);
            if (programming_language) {
                pool.query(queires.addMentorLangs, [email, programming_language]);
            }
                res.status(201).send('Account created successfully');
        }

    }
    catch (error) {
        throw error;
    }
};


// delete account


// update mentor details




module.exports = {getMentors, addMentor, };