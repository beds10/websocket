const express = require('express');
const app = express();
var cors = require('cors');
// Settings

var smsOperaciones = require('./src/routes/smsRoutes.js');

// Middlewares temas de los cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use('/hubservicios/Sms/smsOperaciones', smsOperaciones);



// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;