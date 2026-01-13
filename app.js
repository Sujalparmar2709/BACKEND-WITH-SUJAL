const express = require('express');//define express
const app = express();
const path = require('path');
const userModel = require('./models/user');
const PORT = process.env.PORT || 3000;

//I want to use EJS to make my web pages.
app.set("view engine", "ejs");

//Express can now understand JSON data coming from the client.
app.use(express.json());

//Express can now read data from HTML forms.
app.use(express.urlencoded({ extended: true }));

//Tell Express to serve CSS, JS, and images from the public folder using the correct project path
app.use(express.static(path.join(__dirname, 'public')));

// We can crate a route
app.get('/', (req, res) => {
    res.render("index");
})

app.get('/read', async (req, res) => {
    // Fetch all users to display in the read view
    const users = await userModel.find({});
    res.render("read", { users });
});

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({__id: req.params.id});
    res.render("edit", { user });
});

app.post('/update/:userid', async (req, res) => {
    let {image, name, email} = req.body;
    let user = await userModel.findOneAndUpdate({__id: req.params.id}, {image, name, email}, {new:true});
    res.redirect("/read");
});

app.get('/delete/:id', async (req, res) => {
    // Delete the user by Mongo _id and return to the list
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/read");
});


app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });

    res.redirect("/read");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});