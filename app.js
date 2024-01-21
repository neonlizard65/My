const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/board", (req, res) => {
    res.render("board.ejs");
});

app.get("/algebra", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data', 'algebra.json');

    // Чтение файла json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении JSON файла:', err);
            return;
        }

        let questions = JSON.parse(data);
        res.render('algebra', { questions: questions });
    });
});

app.post('/algebra', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'public', 'data', 'algebra.json');

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении JSON файла:', err);
            return;
        }

        let questions = JSON.parse(data);

        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct == formData[i + 1]) {
                console.log(questions[i].correct);
                console.log(formData[i + 1]);
                count++;
            }
        }
        res.render('result', { result: count, total: questions.length });
    });


})

app.listen(port, () => {
    console.log(`Приложение включено на порту ${port}`);
});
