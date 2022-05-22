
const router = require('express').Router();
const finalSubmissionMessage = require('../controllers/finalSubmissionMessage');
const finalSubmissionWhatsapp = require('../controllers/finalSubmissionWhatsapp');

router.get('/sendmessage', finalSubmissionMessage.sendMessage);
router.get('/sendwhatsapp', finalSubmissionWhatsapp.sendWhatsapp);

module.exports = router;
