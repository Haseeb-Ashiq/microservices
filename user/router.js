const { Register, Login, Profile } = require('./controllers/user.controller');
const userAuth = require('./middleware/userAuth');

const router = require('express').Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/profile', userAuth, Profile);
module.exports = router;