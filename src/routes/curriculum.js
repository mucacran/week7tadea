const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/curriculum');

//new  validations
const validation = require('../middleware/validate');

//esto es para usar el post
const bodyParser = require('body-parser');
const cors = require('cors');
// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(cors());

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveContact, contactsController.enviardatos);

router.put('/:id', validation.updateCurriculum, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;