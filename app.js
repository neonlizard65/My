const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.get("/board", (req, res) => {
    res.render("board.ejs");
    //Comment
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
