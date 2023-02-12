const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {

  const validationRule = {
    name: 'required|string',
    lastname: 'required|string',
    edad: 'required|numeric',
    casado: 'boolean',
    hijos: 'boolean',
    ultimoempleo: 'string',
    gustos: "array"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateCurriculum = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    lastname: 'required|string',
    edad: 'required|numeric',
    casado: 'boolean',
    hijos: 'boolean',
    ultimoempleo: 'string',
    gustos: "array"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
  updateCurriculum
};
