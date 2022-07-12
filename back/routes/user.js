const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/editpicture', auth , multerConfig ,userCtrl.modifyPicture);

module.exports = router;