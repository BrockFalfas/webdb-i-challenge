const express = require('express');

const server = express();

const accountsModel = require('./data/accounts-model');

server.use(express.json());

server.get('/', async (req, res) => {
  try {
    const data = await accountsModel.find();
    res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "The data is not found."});
          }
  });
  

  server.get('/:id', async(req, res) =>{
      try {
            const data = await accountsModel.findById(req.params.id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: "This data cannot be found."})
              }
          } catch (error) {
            console.log(error) 
            res.status(500).json({ message: "This ID does not exist."});
          }
});

server.post('/', async(req, res) => {
      try {
            const message = await accountsModel.add(req.body)
            res.status(201).json(msg);
          } catch (error) {
              console.log(error)
              res.status(404).json({ error: "The message was not posted."});
          }
});

server.put('/:id', async(req, res) => {
      try {
            const data = await accountsModel.update(req.params.id, req.body);
            if(data) {
              res.json({data});
            } else {
              res.status(404).json({ message: "This data cannot be found."})
            }
          } catch (error) {
              console.log(error);
              res.status(500).json({ message: "There was an error updating."});
          }
});

server.delete('/:id', async(req, res) => {
              try {
              const count = await accountsModel.remove(req.params.id);
              if (count > 0) {
                res.json({ message: "The data was removed."})
              } else {
                res.status(404).json({ message: "The data was not able to be found."})
              }
            } catch (error) {
              console.log(error);
              res.status(500).json({ message: "There was an error deleting the data."});
            }
});

module.exports = server;