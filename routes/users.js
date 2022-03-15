const express = require("express")
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

const bcrypt = require('bcrypt');
// const { redirect } = require("express/lib/response");
const saltRounds = 10;

let session;

  router.post("/login", async (req, res) => {
    try {
        const getUser = await User.findOne({ gebruikersnaam: req.body.gebruikersnaam });
        if (getUser) {
          const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
          if (comparePassword) {
            console.log("Succesvol ingelogd!");
            session = req.session;
            session.gebruikersnaam = req.body.gebruikersnaam;
            return res.status(200).redirect('/verkennen');
          } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/');
          }
        } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).redirect('/');
    }
});


router.get('/accountmaken', (req, res) => {
    res.render('accountmaken');
  });

router.post('/aangemaakt', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const createUser = new User({
        voornaam: req.body.voornaam,
        achternaam: req.body.achternaam,
        gebruikersnaam: req.body.gebruikersnaam,
        email: req.body.email,
        password: hashedPassword
    });
    createUser.save((error) => {
        if (error) {
            console.error(error);
            return res.status(500).redirect('/accountmaken');
        } else {
            console.log("Account aangemaakt!")
            session = req.session;
            session.gebruikersnaam = req.body.gebruikersnaam;
            return res.status(200).redirect('/verkennen');
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    console.log("Uitgelogd!")
});

router.post('/verwijderd', (req, res) => {
  session = req.session;
  console.log(session.gebruikersnaam)
  User.find({ gebruikersnaam: session.gebruikernaam }).remove().exec();
  session.destroy();
  res.redirect('/');
});


module.exports = router;