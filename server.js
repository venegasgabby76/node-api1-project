const express = require("express");
const db = require("./database");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Hello World!!",
  });
});


// get requests 
server.get("/users", (req, res) => {
  const users = db.getUsers();

  if (users) {
    res.status(201).json(users);
  } else {
    res.status(500).json({
      errorMessage: "The information could not be retrieved",
    });
  }
});

server.get("/users/:id", (req, res) => {
    const id = req.params.id;

    const users = db.getUserById(id);

    if (users) {
        res.json(users);
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist." 
        })
    }
})


// post request 

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    });

    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "The information could not be retrieved"
        })
    }

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({
            errorMessage: "The information could not be retrieved"
        })
    }
})

// put request 
server.put("/users/:id", (req,res) => {
    const id = req.params.id;
    const user = db.getUserById(id);

    if (user) {
        const updateUser = db.updateUser(id, {
            name: req.body.name,
            bio: req.body.bio
        }); 
        res.json(updateUser);
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist." 
        })
    }
})


// delete request 
server.delete("/users/:id", (req,res) => {
    const id = req.params.id;
    const user = db.getUserById(id);
  
    if (user) {
      db.deleteUser(id);
      res.status(204).end();
    } else {
      res.status(404).json({
       message: "The user with the specified ID does not exist.",
      });
    }
  
})

server.listen(6000, () => {
  console.log("your server has started");
});
