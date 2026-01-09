const express = require('express');//define express
const app = express();

const userModel = require(`./usermodel`)

app.get('/',(req, res) =>{
    res.send("hey");
})

app.get('/create', async (req, res) =>{
    let createduser = await userModel.create({
        name: "Sujal",
        username: "sujalparmar",
        email: "sujalparmar2709@gmail.com"
    })
    res.send(createduser);
})

app.listen(3000);