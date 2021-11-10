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
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "abdullashaikh36319@gmail.com",
    pass: "Abdulla@786",
  },
});

app.post("/send_mail", cors(), async (req, res) => {
  let data = req.body;

  return await transport.sendMail(
    {
      from: "abdullashaikh36319@gmail.com",
      to: "pankajfaliyachi5805@gmail.com",
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
        <p>${data.text}</p>
    
        <p>All the best, Abdulla</p>
         </div>
    `,
    },
    function (error, info) {
      if (error) {
        console.log(error);
        // res("Email sent: " + info.response);
      }
      return {
        statusCode: 200,
        status: "SUCCESS",
        body: info.response,
      };
      // console.log("Email sent: " + info.response);
      // res("Email sent: " + info.response);
    }
  );
});
app.get("/test", cors(), async (req, res) => {
  res("Test");
});
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
