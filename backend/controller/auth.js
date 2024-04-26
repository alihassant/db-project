const crypto = require("crypto");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const User = require("../models/user");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

const generalPromiseError = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        errors.array()[0].msg || "User Registration Failed."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const {
      name,
      email: emailBody,
      username: usernameBody,
      password,
      priceId,
    } = req.body;

    const email = emailBody.toLowerCase();
    const username = usernameBody.toLowerCase();
    const checkUserEmail = await User.findOne({ email });

    if (!priceId || !email || !username || !password) {
      const error = new Error("Please provide all the fields.");
      error.statusCode = 422;
      throw error;
    }

    if (checkUserEmail) {
      const error = new Error("User already exists with this email.");
      error.statusCode = 422;
      throw error;
    }

    const checkUserUsername = await User.findOne({ username });
    if (checkUserUsername) {
      const error = new Error("User already exists with this username.");
      error.statusCode = 422;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    // creating stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
    });

    let user;
    if (priceId === "free") {
      user = new User({
        name,
        email,
        username,
        password: hashedPw,
        customerId: customer.id,
        currentPlan: "free",
        payments: {
          subscription: {
            subscriptionId: "free",
            priceId: "free",
            status: "active",
            startedOn: Date.now(),
          },
        },
      });
    } else {
      user = new User({
        name,
        email,
        username,
        password: hashedPw,
        customerId: customer.id,
      });
    }
    // console.log(user);

    const result = await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      message: "User Registered!",
      email: result.email,
      name: result.name,
      userId: result._id,
      username: result.username,
    });

    // sending email after successful signup
    await transporter.sendMail({
      from: "support@vortaps.tech", // sender address
      to: result.email, // list of receivers
      subject: "Sign up Successfull!!!", // Subject line
      text: "Welcome", // plain text body
      html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        
          <style type="text/css">
            @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
      
        .u-row .u-col-33p33 {
          width: 199.98px !important;
        }
      
        .u-row .u-col-66p67 {
          width: 400.02px !important;
        }
      
        .u-row .u-col-100 {
          width: 600px !important;
        }
      
      }
      
      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_heading_1 .v-font-size { font-size: 28px !important; } #u_content_text_1 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_image_5 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_image_5 .v-src-width { width: auto !important; } #u_content_image_5 .v-src-max-width { max-width: 50% !important; } #u_content_heading_2 .v-container-padding-padding { padding: 20px 10px 0px !important; } #u_content_heading_2 .v-text-align { text-align: center !important; } #u_content_text_6 .v-text-align { text-align: center !important; } #u_content_social_1 .v-container-padding-padding { padding: 10px 10px 10px 55px !important; } #u_content_text_7 .v-container-padding-padding { padding: 0px 10px 30px !important; } #u_content_text_7 .v-text-align { text-align: center !important; } #u_content_text_8 .v-container-padding-padding { padding: 30px 10px !important; } }
          </style>
        
        
      
      <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
          
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ecf0f1;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ecf0f1;height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
              
        <!--[if mso]><table width="100%"><tr><td><![endif]-->
          <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 30px; font-weight: 400;"><span><span><strong>VORTAPS</strong></span></span></h1>
        <!--[if mso]></td></tr></table><![endif]-->
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table id="u_content_heading_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 100px 30px;font-family:'Raleway',sans-serif;" align="left">
              
        <!--[if mso]><table width="100%"><tr><td><![endif]-->
          <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 130%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 31px; font-weight: 400;"><span>Sign up Successfull! </span></h1>
        <!--[if mso]></td></tr></table><![endif]-->
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ecf0f1;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ecf0f1;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px;font-family:'Raleway',sans-serif;" align="left">
              
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: justify; word-wrap: break-word;">
                <p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 22.4px;"><strong>Hello ${result.name}</strong></span></p>
            <p style="line-height: 140%; font-size: 14px;"> </p>
            <p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">You have successfully signed up with the username: ${result.username}  </span></p>
              </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table id="u_content_image_5" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px;font-family:'Raleway',sans-serif;" align="left">
              
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
            
            <img align="center" border="0" src="https://scontent.fmux3-1.fna.fbcdn.net/v/t31.18172-8/21752535_353350631768981_2571868015924086919_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeFPBx0FcANCvXcqLVMPUgC5JFj3ao4ygGEkWPdqjjKAYb8Rx_umByx0FO2iTnX8Y1y_1d4tfbKWb93F2rUPvjgv&_nc_ohc=3Pi4BI6w_YwAX-UNgni&_nc_ht=scontent.fmux3-1.fna&oh=00_AfDmzs6KKySDTu9dHIeKtFnoDUomCcWM_xR0BnA39gb_oQ&oe=65EE2E36" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 77%;max-width: 138.6px;" width="138.6" class="v-src-width v-src-max-width"/>
            
          </td>
        </tr>
      </table>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:43px 10px 0px;font-family:'Raleway',sans-serif;" align="left">
              
        <!--[if mso]><table width="100%"><tr><td><![endif]-->
          <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 22px; font-weight: 400;"><span><strong>Ali Hassan</strong></span></h1>
        <!--[if mso]></td></tr></table><![endif]-->
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table id="u_content_text_6" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Raleway',sans-serif;" align="left">
              
        <div class="v-text-align v-font-size" style="font-size: 14px; color: #3d3d3d; line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">Founder</span></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table id="u_content_social_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
              
      <div align="left">
        <div style="display: table; max-width:167px;">
        <!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:167px;"><tr><![endif]-->
        
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://www.facebook.com/layanAHT" title="Facebook" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="auto" fill="black" class="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://twitter.com/alihassanv" title="Twitter" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="auto" fill="black" class="bi bi-twitter-x" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://www.linkedin.com/in/alihassant" title="LinkedIn" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="auto" fill="black" class="bi bi-linkedin" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://www.instagram.com/alihassant" title="Instagram" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="auto" fill="black" class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table id="u_content_text_7" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
              
        <div class="v-text-align v-font-size" style="font-size: 14px; color: #3d3d3d; line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">+123 456 7890  |  ali@vortaps.tech</span></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
        
        
      <div class="u-row-container" style="padding: 0px;background-color: #407bff">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #407bff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table id="u_content_text_8" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 60px;font-family:'Raleway',sans-serif;" align="left">
              
        <div class="v-text-align v-font-size" style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><u>vortaps.tech</u></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
      `, // html body
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email: emailBody, password } = req.body;
  const email = emailBody.toLowerCase();
  let loadedUser;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: loadedUser._id,
        email: loadedUser.email,
        defaultRole: loadedUser.defaultRole,
        extraRole: loadedUser.extraRole,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const expiresIn = decodedToken.exp;

    res.status(200).json({
      token,
      expiresIn,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  // console.log(req.headers.authorization);
  try {
    const user = await User.findById(userId)
      .populate("toDos")
      .populate("entries");
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const currentDate = Date.now();
    const validTill = user.payments.subscription.validTill * 1000;

    if (
      validTill < currentDate &&
      user.payments.subscription.status === "canceled"
    ) {
      user.payments.subscription = {
        subscriptionId: null,
        validTill: null,
        status: "free",
      };
      user.currentPlan = "free";
      await user.save();
    }

    /*
    function isGreaterThan30Days(timestamp) {
      // Check if timestamp is a valid number
      if (typeof timestamp !== "number" || isNaN(timestamp)) {
        throw new Error("Invalid timestamp provided");
      }

      // Get the current timestamp in milliseconds
      const currentTimestamp = Date.now();

      // Calculate the timestamp 30 days in the past
      const thirtyDaysAgo = currentTimestamp - 30 * 24 * 60 * 60 * 1000;
      console.log("Thirty Days Ago: ", thirtyDaysAgo);

      // Return false if the provided timestamp is older than 30 days ago
      return timestamp < thirtyDaysAgo;
    }
    console.log(isGreaterThan30Days(1629340800000));

    if (user.payments.subscription.validTill === null) {
      const userSub = isGreaterThan30Days(
        // user.payments.subscription.validTill * 1000
        1629340800000
      );
      if (!userSub) {
        user.payments.subscription = {
          validTill: null,
          status: "expired",
          plan: null,
        };
        await user.save();
      }
    }
    */

    res.status(200).json({
      message: "User Found Successfully!!!",
      user,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getResetPasswordLink = async (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      generalPromiseError(err);
      next(err);
    }
    const token = buffer.toString("hex");
    try {
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("No account with that email found.");
        error.statusCode = 404;
        throw error;
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      res.status(200).json({
        message:
          "Reset password link sent successfully, Please check your email.",
        token,
      });
      transporter.sendMail({
        to: email,
        from: "help@vortaps.tech",
        subject: "Password Reset",
        html: `
        <p>You requested a password reset</p> 
        <p>Click this <a href="http://localhost:3000/reset/changePassword?resetToken=${token}">link</a> to set a new password.</p>
        `,
      });
    } catch (err) {
      generalPromiseError(err);
      next(err);
    }
  });
};

exports.resetPassword = async (req, res, next) => {
  const { password, token } = req.body;
  try {
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      const error = new Error(
        "Token invalid, Please reset the password again."
      );
      error.statusCode = 404;
      throw error;
    }
    if (user.resetTokenExpiration < Date.now()) {
      const error = new Error("Token Expired!!!");
      error.statusCode = 404;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password Reset Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};
