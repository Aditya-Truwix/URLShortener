const express = require(`express`);
const router = express.Router();
const {add,redirect_to,analytics} = require('../controllers/url_controller');

router.post('/add',add);
router.get('/:id',redirect_to);
router.get('/analytics/:id',analytics);

module.exports = router;


