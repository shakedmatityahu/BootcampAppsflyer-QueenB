const { Router } = require('express');
const controller = require('./controller');

const router = Router();
// get all mentors route
router.get('/mentors', controller.getMentors);

// add mentor route
router.post('/mentors', controller.addMentor);


//////// (below are optional) ////////

// signup route (optional) 


// login route (optional)

module.exports = router;