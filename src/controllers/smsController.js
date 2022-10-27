var request = require("request");
var propertiesReader = require('properties-reader');
var properties = propertiesReader('webhook.properties');
var token = properties.get('autentificacion.token');
var moment = require('moment');

exports.getParams = async (req, res) => {
  try {
    if(!req.query)
    {
      console.log("AGV NO ENVIO PARAMETROS");
      var status = { status: "400", mensajeExito: "FALTAN PARAMETROS POR PARTE AGV" }
      res.json(status).status(200).end();
    }else {
      const { clienteID } = req.params;
      const { type, reference, number, message, response, send_date, response_date } = req.query;
      var fechaInicioC = "";
      var fechaInicioC = "";
      if (!!!req.query.send_date && !!!req.query.send_date) {
        console.log("NO SE RECIBIO FECHA POR PARTE AGV");
         fechaInicioC =  moment().format('YYYY-MM-DD HH:mm:ss');
         fechaFinC =  moment().format('YYYY-MM-DD HH:mm:ss');
      }else{
         fechaInicioC =  moment(send_date,'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
       fechaFinC =  moment(response_date,'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
      }
      var body = {
        tipoAccion: type,
        telefono: number,
        referencia: reference,
        mensaje: message,
        mensajeRespuesta: response,
        fechaInicio: fechaInicioC,
        fechaFin: fechaFinC
      }
      
      if (!Object.keys(req.query).length) {
        console.log("AGV NO ENVIO PARAMETROS");
        var status = { status: "400", mensajeExito: "PARAMETROS VACIOS" }
        res.json(status).status(200).end();
      } else {
        if (type === 'response') {
          console.log('---- CLIENTEID ------ ' + clienteID);
          console.log('---- DATOS RECIBIDOS POR AGV------');
          console.log(req.query);
          console.log('----- DATOS A ENVIAR AL WS RECEPCION MENSAJES ------');
          console.log(body);
          const options = {
            url: 'http://127.0.0.1:8080/Sms/smsOperaciones/recepcionMensajesAGV/' + clienteID,
            headers: {
              'autentificacion': token,
            },
            json: true,
            body: body
          };
          request.post(options, (err, resp, body) => {
            if (err) {
              console.log(err);
              console.log("ERROR DE CONEXION URL O CONSUMO WS");
              var status = { status: "400", mensajeError: "ERROR DE CONEXION URL O CONSUMO WS" }
              res.json(status).status(200).end();
            }else
            {
              console.log("Se envio el mensaje al WS");
              var status = { status: "200", mensajeExito: "Mensaje Enviado al WS-RecepcionMensajesAGV" }
              res.json(status).status(200).end();
            }
          });
        }
      }
     
    }
   
   

  } catch (e) {
    var status = { status: "400", mensajeExito: "ERROR" }
    res.json(status).status(200).end();
    throw e;
  }
}
