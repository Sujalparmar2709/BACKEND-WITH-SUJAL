const express = require('express');//define express
const app = express();

const userModel = require(`./usermodel`)

app.get('/', (req, res) => {
    res.send("hey");
})

app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: "Sujal",
        username: "sujalparmar",
        email: "sujalparmar2709@gmail.com"
    })
    res.send(createduser);
})

app.get("/read", async (req, res) => {
    let users = await userModel.find();
    res.send(users);
})

app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({ username: "sujal" }, { name: "sujal parmar" }, { new: true })
    res.send(updateduser);
})


app.get("/delete", async (req, res) => {
    let users = await userModel.findOneAndDelete({ username: "sujalparmar" });
    res.send(users);
})

app.listen(3000);