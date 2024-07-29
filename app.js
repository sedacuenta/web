const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Asegúrate de tener el modelo de usuario
const path = require('path');
const swig = require('swig');
const MongoStore = require('connect-mongo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://sedacuenta:notengonombre@cluster0.p6k2wlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://sedacuenta:notengonombre@cluster0.p6k2wlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' })
}));

app.use(passport.initialize());
app.use(passport.session());

// Configuración de Swig como motor de plantillas
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'views'));

// Configuración de Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Configuración de la estrategia de Google
passport.use(new GoogleStrategy({
  clientID: '961150487302-9t3p7p2kpoeqclo4tojp8b54hh77gc18.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'https://49f4e4bd-8acb-4403-a900-bfd7c405e113-00-1kfduz3d44fui.riker.replit.dev/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
}
));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index.swig', { user: req.user });
});

// Ruta about
app.get('/about', (req, res) => {
  res.render('about.swig', { user: req.user });
});

// Ruta contact
app.get('/contact', (req, res) => {
  res.render('contact.swig', { user: req.user });
});

// Ruta products
app.get('/products', (req, res) => {
  res.render('products.swig', { user: req.user });
});

// Ruta dashboard
app.get('/dashboard', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/google');
  }
  res.render('dashboard.swig', { user: req.user });
});

// Ruta para actualizar el nombre de usuario
app.post('/update-name', (req, res) => {
  const newName = req.body.customName;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { customName: newName }, { new: true }, (err, updatedUser) => {
    if (err) {
      return res.status(500).send("Error updating name.");
    }
    res.redirect('/dashboard');
  });
});

// Ruta para autenticación con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback para Google
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
