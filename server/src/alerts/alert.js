var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "entrepreneur2021auction@gmail.com",
    pass: "EAuction2021",
  },
});

const alertMail = (email, name) => {
  var mailOptions = {
    from: "entrepreneur2021auction@gmail.com",
    to: "akash213kulkarni@gmail.com",
    subject: "Alert on your Watchlist ! Check Now !!",
    html: `
      <div>
        <h1>Hello ${name}</h1>

        <h2>Your target was triggered !!</h2>

        <h4> Happy Investing </h4>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  alertMail,
};
