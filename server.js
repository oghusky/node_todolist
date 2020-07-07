const express = require('express'),
  app = express(),
  fs = require('fs'),
  path = require('path'),
  PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// view route
app.get("/", (req, res) => {
  res.sendFile("./pulic/index.html");
});

// api routes
app.get("/api/todos", (req, res) => {
  fs.readFile("./db/todos.json", (err, data) => {
    const todos = JSON.parse(data);
    res.json({
      todos
    })
  })
});

app.post("/api/todos", (req, res) => {
  if (req.body.id != "") {
    // this is reading file before post so that we can grab, then erase, then recreate todos array
    fs.readFile("./db/todos.json", (err, data) => {
      const todos = JSON.parse(data);
      todos.push({
        id: req.body.id,
        text: req.body.text
      });
      console.log(todos);
      // this is the info from our post
      fs.writeFile("./db/todos.json", JSON.stringify(todos), (err) => {
        if (!err) console.log("it worked");
      })
    })
  } else {
    console.log("string empty")
  }
});


app.listen(PORT, () => {
  console.log("SERVER STARTEd ON PORT: " + PORT);
});
