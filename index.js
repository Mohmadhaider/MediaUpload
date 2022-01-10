const express = require("express");
const app = express();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
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
    user: "buyamia@fahm-technologies.com",
    pass: "buyamia@fahmtechnologies",
  },
});

let filename = "";

app.post("/send_mail", cors(), async (req, res) => {
  // let data = req.body;

  let resData = await transport.sendMail({
    from: "buyamia@fahm-technologies.com",
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
    from: "buyamia@fahm-technologies.com",
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
  console.log("baseurl" in data);
  let url = "https://axshlo8do5.execute-api.ap-south-1.amazonaws.com/dev";
  if ("baseurl" in data) {
    url = data.baseurl;
  }

  let resData = await transport.sendMail({
    from: "buyamia@fahm-technologies.com",
    to: data.mail,
    subject: " Your account activation link",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Click on below link to activate your account and explore great market place.</h2>
      <a href="${url}/authenticationCheck/${data.token}">Click here</a>
         </div>
    `,
  });
  res.send({
    statusCode: 200,
    status: "SUCCESS",
    body: resData,
  });
});

//UploadMedia
aws.config.update({
  secretAccessKey: "WBA4IXFGohXFDtnJXDo+6vvC4ZarAxKBQOT479HV",
  accessKeyId: "AKIA6EZJWVSNTYWAFXCI",
  region: "ap-south-1",
});

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "buyamia-seller-media",
    key: function (req, file, cb) {
      let ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      cb(
        null,
        filename + "_" + Date.now().toString() + "." + ext.toLowerCase()
      );
    },
  }),
});

app.post("/upload/:sid", async function (req, res, next) {
  filename = req.params.sid;
  upload.array("file", 1)(req, res, async () => {
    return await res.send({
      statusCode: 200,
      status: "True",
      body: req.files.map((file) => ({
        location: file.location,
        name: file.key,
      })),
    });
  });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
