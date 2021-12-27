const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
const transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.ionos.com",
  auth: {
    user: "htt@fahm-technologies.com",
    pass: "Htt.fahmtechnologies",
  },
});

app.post("/send_mail", cors(), async (req, res) => {
  // let data = req.body;

  let resData = await transport.sendMail({
    from: "htt@fahm-technologies.com",
    to: data.mail,
    subject: "test email",
    attachments: [
      {
        filename: "test.pdf",
        path: "https://httdemo.s3.ap-south-1.amazonaws.com/test.pdf",
      },
    ],
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>data</p>
    
        <p>All the best, Abdulla</p>
         </div>
    `,
  });
  res.send({
    statusCode: 200,
    status: "SUCCESS",
    body: resData,
  });
});

app.post("/send_mail_activation_link", cors(), async (req, res) => {
  let data = req.body;

  let resData = await transport.sendMail({
    from: "htt@fahm-technologies.com",
    to: data.mail,
    subject: "Activation Link For Buyamia Seller",
    // attachments: [
    //   {
    //     filename: "test.pdf",
    //     path: "https://httdemo.s3.ap-south-1.amazonaws.com/test.pdf",
    //   },
    // ],
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <a href=https://axshlo8do5.execute-api.ap-south-1.amazonaws.com/dev/authenticationCheck/${data.token}>Click Here</a>
         </div>
    `,
  });
  res.send({
    statusCode: 200,
    status: "SUCCESS",
    body: resData,
  });
});

app.post("/send_activation_mail", cors(), async (req, res) => {
  let data = req.body;

  let resData = await transport.sendMail({
    from: "htt@fahm-technologies.com",
    to: data.mail,
    subject: "Activation Link by Buyamia",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Click Here to Activate your Account!</h2>
        <a href="https://axshlo8do5.execute-api.ap-south-1.amazonaws.com/dev/authenticationCheck/${data.token}">Click me</p>
    
         </div>
    `,
  });
  res.send({
    statusCode: 200,
    status: "SUCCESS",
    body: resData,
  });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
