const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req,res) =>{
    console.log(req.body);
    let imgpath = __dirname + 'public/assets/images/logo.png';
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@d-rby.com",
          pass: "Infoderby2021$"
        }
      });
    let info =  transporter.sendMail({
        from: 'info@d-rby.com',
        to: "maubamador@gmail.com",
        subject: "Korodent - Cita",
        html: `<h1 style="color:#D3A931; font-size:40px" >Cita nueva Korodent</h1> 
                <hr>
            <p><span style="font-weight:bold; color:#D3A931">Nombre: </span> ${req.body.nombre}</p> 
            <p><span style="font-weight:bold; color:#D3A931" >Servicio requerido: </span> ${req.body.servicio}</p>
            <p><span style="font-weight:bold; color:#D3A931">Fecha y hora: </span> ${req.body.fecha} a las ${req.body.hora}</p>
            <p><span style="font-weight:bold; color:#D3A931">Mensaje: </span> ${req.body.mensaje}</p>
            <hr>
            <p>Equipo Korodent</p>

        `
    });
} )
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})