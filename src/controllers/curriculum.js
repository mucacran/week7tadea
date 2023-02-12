const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//imprime por pantalla todo lo que esta en la base de datos
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('Test').collection('curriculum').find();
  result.toArray().then((lists) => {
    //console.log(lists.name); // Imprime todos los datos en la consola
    console.log("------lista de los nombres------");
    lists.forEach((list) => {    
        console.log(list.name); // Imprime solo el nombre en la consola
      });
    console.log("-----FIN de  lista de los nombres-----");
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

//imprime por pantalla un contacto segun su id que se escriba en el buscador
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Test').collection('curriculum').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//publica dentro de la tabla
const enviardatos = async (req, res) => {
  console.log(`Se acaba de ingresar ${req.body.firstName}`);

  const contact = {
    name: req.body.name,
    lastname: req.body.lastname,
    edad: req.body.edad,
    casado: req.body.casado,
    hijos: req.body.hijos,
    ultimoempleo: req.body.ultimoempleo,
    gustos: req.body.gustos
  };
  const response = await mongodb.getDb().db('Test').collection('curriculum').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const curriculum = {
    name: req.body.name,
    lastname: req.body.lastname,
    edad: req.body.edad,
    casado: req.body.casado,
    hijos: req.body.hijos,
    ultimoempleo: req.body.ultimoempleo,
    gustos: req.body.gustos
  };

  const response = await mongodb.getDb().db('Test').collection('curriculum').replaceOne({ _id: userId }, curriculum);
  console.log("> actualizando datos");
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the curriculum.');
  }
};

const deleteContact = async (req, res) => {
 
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Test').collection('curriculum').deleteOne({ _id: userId });
  console.log(`Se acaba de eliminar el id: ${userId}`);

  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  enviardatos,
  updateContact,
  deleteContact
};
