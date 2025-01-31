const usermod = require("../models/usermodel");
const bcrypt = require("bcrypt");
const { auth, generateToken } = require("../middleware/jwt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config");
const OAuth2 = google.auth.OAuth2;
const SECRET = "ioendlckn65";

exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    let b_password = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_password;
    let checkEmail = await usermod.findOne({ email: email });

    if (checkEmail) {
      return res.status(401).json({ statsu: "user already exists" });
    }

    const data = await usermod.create(req.body);

    const playload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
    };

    const token = generateToken(playload);

    res.status(200).json({ status: "success", data, token: token });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
  

    // Find the user by email
    const user = await usermod.findOne({ email: email ,isDeleted:false});
    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const playload = {
      id:user.id,
      email: user.email,
      
      password: user.password,
    };

    const token = generateToken(playload);
    const OAuth2_client = new OAuth2(config.clientID, config.clientSecret);
    OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
    async function send_mail(recipient) {
      try {
        const accessToken = await OAuth2_client.getAccessToken();
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: config.user,
            clientId: config.clientID,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken.token,
          },
        });

        const mailOptions = {
          from: config.user,
          to: recipient,
          subject: "login Success!",
          text: `welcome login success ${recipient} ${token}`,
          // html: get_html_message(name),
        };

        await transport.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    send_mail(req.body.email);

    res.status(200).json({ status: "login success", token: token });
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    let user = await usermod.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ status: "User Not Found" });
    }
    const playload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(playload);

    const OAuth2_client = new OAuth2(config.clientID, config.clientSecret);
    OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
    async function send_mail(recipient) {
      try {
        const accessToken = await OAuth2_client.getAccessToken();
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: config.user,
            clientId: config.clientID,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken.token,
          },
        });

        const mailOptions = {
          from: config.user,
          to: recipient,
          subject: "Forgot Password",
          text: `Token is : ${token}`,
        };
        const result = await transport.sendMail(mailOptions);
        // console.log(result);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    send_mail(email);
    res.status(200).json({ status: "Mail has Been Send" });
  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let { token } = req.body;
    let bcrypt_password = await bcrypt.hash(req.body.password, 10);
    req.body.password = bcrypt_password;

    let decode = jwt.verify(token, SECRET);
    let email = decode.email;

    const data = await usermod.findOneAndUpdate(
      { email: email },
      { password: bcrypt_password }
    );
    // console.log('user is...',token);
    res.status(200).json({
      status: "Password Reset successfully",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
