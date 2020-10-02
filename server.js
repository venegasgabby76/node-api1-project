const express = require("express");
const db = require("./database");

const server = express();

// this allows us to parse request JSON bodies
server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to our API",
  });
});

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })

  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }
  if (newUser) {
    res.status(201).json(newUser);
  } else {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      })
  }
});

server.get("/users", (req, res) => {
    const users = db.getUsers();

    if (users) {
        res.status(201).json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.listen(8080, () => {
  console.log("server started");
});
