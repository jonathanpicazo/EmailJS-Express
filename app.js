import express from 'express'
import emailjs from '@emailjs/browser'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
//import XMLHttpRequest from 'xhr2'


const app = express()
//var xhr = new XMLHttpRequest()
app.use(cors())
app.use(express.json())
dotenv.config()
emailjs.init(process.env.EMAILJS_USER_ID);

let port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send("Hello world")
})


app.get('/sendForm', (req, res) => {
  let payload = req.body
  let parsedMessage = payload['subject'] + '\n' + payload['message'] + '\n' + payload ['email']
  let templateParams = {
    to_name: 'Jonathan Picazo',
    from_name: payload['name'],
    message: parsedMessage
  }
  emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });
  res.send(templateParams)
})

app.listen(port, () => {
  console.log(`Example app is listening on port http://localhost:${port}`)
})