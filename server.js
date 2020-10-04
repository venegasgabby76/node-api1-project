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
  });

  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.get("/users", (req, res) => {
  const users = db.getUsers();

  if (users) {
    res.status(201).json(users);
  } else {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const user = db.getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    db.deleteUser(id);
    // 204 means a successful empty response
    res.status(204).end();
  } else {
    res.status(404).json({
     message: "The user with the specified ID does not exist.",
    });
  }
});



server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    const upDateUser = db.updateUser(id, {
      name: req.body.name,
      bio: req.body.bio
    });
    res.json(upDateUser);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// server.put("/users/:id", (req, res) => {
//   const upDate = db.updateUser({
//     name: req.body.name,
//     bio: req.body.bio,
//   });

//   if (!req.body.name || !req.body.bio) {
//     return res.status(400).json({
//       errorMessage: "Please provide name and bio for the user.",
//     });
//   }
//   if (upDate) {
//     res.status(201).json(upDate);
//   } else {
//     res.status(500).json({
//       errorMessage: "The user information could not be modified.",
//     });
//   }
// });


server.listen(8080, () => {
  console.log("server started");
});
