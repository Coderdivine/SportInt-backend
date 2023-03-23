const request = require("request");
const CustomError = require("./custom-error");
require("dotenv");

async function sendMail({
    email,
    otp,
}){

    const options = {
        method: "POST",
        url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.AUTH_KEY,
            useQueryString: true,
        },
        body: {
            personalizations: [
                { to: [{ email: email }], subject: "OTP link" },
            ],
            from: { email: process.env.AUTH_PASS_EMAIL },
            content: [
                {
                    type: "text/html",
                    value: `                
          <div>
          <div id="header" style="text-align:center;background:#000;color:#fff;
          padding:5px 12px;border-radius:5px;font-style:sans-serif;">
          <h1>SPORT INT.</h1>
          </div>
          <section id="body" style="margin:0;padding:0;box-sizing:border-box;
          background:whitesmoke;border-radius:6px;padding:6px 18px;font-style:sans-serif;">
          <small style="font-style:sans-serif;">Hey there. Here is your <span>One Time Pass Code
          (OTP)</span> ${otp}. <b>Do not share this code with a third party. </b></small>
          </section>
          </div>`,
                },
            ],
        },
        json: true,
    };

    console.log({body:options.body.from});

    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (error) {
            reject(new CustomError(error.message));
          } else {
            console.log({body:body});
            
            resolve({
              email,
              otp,
            });
          }
        });
      });

    };

async function sendForgotPasswordMail({
    otp,
    email 
}){

    const options = {
        method: "POST",
        url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.AUTH_KEY,
            useQueryString: true,
        },
        body: {
            personalizations: [
                { to: [{ email: email }], subject: "OTP link" },
            ],
            from: { email: process.env.AUTH_PASS_EMAIL },
            content: [
                {
                    type: "text/html",
                    value: `                
          <div>
          <div id="header" style="text-align:center;background:#000;color:#fff;
          padding:5px 12px;border-radius:5px;font-style:sans-serif;">
          <h1>SPORT INT.</h1>
          </div>
          <section id="body" style="margin:0;padding:0;box-sizing:border-box;
          background:whitesmoke;border-radius:6px;padding:6px 18px;font-style:sans-serif;">
          <small style="font-style:sans-serif;">Password reset code<span>One Time Pass Code
          (OTP)</span> ---> ${otp}. <b>Do not share this code with a third party. </b></small>
          </section>
          </div>`,
                },
            ],
        },
        json: true,
    };

    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
          if (error) {
            reject(new CustomError(error.message));
          } else {
            console.log({body:body});
            
            resolve({
              email,
              otp,
            });
          }
        });
      });

};

module.exports = {sendMail,sendForgotPasswordMail};