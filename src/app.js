const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body; 
    const repository = {id: uuid(), title, url, likes: 0, techs};
    repositories.push(repository);
    return response.send(repository);
});

app.put("/repositories/:id", (request, response) => {
    const id = request.params.id;
    const {title, url, techs} = request.body; 
    const repository = repositories.find(repo => repo.id === id)
    
    if(!repository){
      return response.status(400).send();
    }
    
    const updatedRepository = {...repository, title, url, techs};

    const indexToUpdate = repositories.indexOf(repository);
    repositories[indexToUpdate] = updatedRepository;

    return response.send(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
    const repository = repositories.find(repo => repo.id === id)
    
    if(!repository){
      return response.status(400).send();
    }

    const indexToDelete = repositories.indexOf(repository);
    repositories.splice(indexToDelete, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const id = request.params.id;
    const repository = repositories.find(repo => repo.id === id)
    
    if(!repository){
      return response.status(400).send();
    }
    
    const likes = repository.likes + 1;

    const updatedRepository = {...repository, likes};

    const indexToUpdate = repositories.indexOf(repository);
    repositories[indexToUpdate] = updatedRepository;

    return response.send(updatedRepository);
});

module.exports = app;
