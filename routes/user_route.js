const express = require('express');
const app = express();
const router = express.Router();
const {add} = require('../controllers/user_controller');

router.post('/add',add);

module.exports = router;