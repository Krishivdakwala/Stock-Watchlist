var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "entrepreneur2021auction@gmail.com",
    pass: "EAuction2021",
  },
});

const welcomeMail = (email, name) => {
  var mailOptions = {
    from: "entrepreneur2021auction@gmail.com",
    to: email,
    subject: "Welcome OnBoard !!",
    html: `
      <div>

        <h2>Hello ${name}</h2>
        <h2>Thank you for registering with us!!</h2>
        <h3>Welcome to stock market</h3>
        <h4>We would like to tell you about features offered by us.<br><br> Our features :-</h4>
        <ul>
            <li><b>Real time data of stocks</b></li>
            <li><b>You can create multiple watchlists where you can insert various stocks of your choice</b></li>
            <li><b>Get notified through mail about a stock, when it hits the desired price of yours</b></li>
        </ul>
    
        <h4>We hope that you enjoy our services.
          <h2>Regards,</h2>
          <h2>Stockerzz : A Project By</h2>
          <h3>Akash Kulkarni</h3>
          <h3>Krishiv Dakwala</h3>
          <h3>Zain Shaikh</h3>
          <h3>Ashish Patil</h3>

          <h2>Happy Researching :) </h2>
        </h4>
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

const newsMail = (email, name) => {
  var mailOptions = {
    from: "entrepreneur2021auction@gmail.com",
    to: email,
    subject: "Welcome OnBoard !!",
    html: `
      <div>
        <h1>Hello ${name}</h1>
        <h2>Greetings of the day!!</h2>
        <h4>Don't miss out on latest updates. Catch all the latest activity on the news tab. <br>
            Have a great day!!
        </h4>

        <h2>Regards,</h2>
        <h2>Stockerzz : A Project By</h2>
        <h3>Akash Kulkarni</h3>
        <h3>Krishiv Dakwala</h3>
        <h3>Zain Shaikh</h3>
        <h3>Ashish Patil</h3>

        <h2>Happy Researching :) </h2>
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

const watchlistMail = (name, email, watchlistName) => {
  var mailOptions = {
    from: "entrepreneur2021auction@gmail.com",
    to: email,
    subject: "Watchlist Created !!",
    html: `
      <div>
        <h1>Hello ${name}</h1>

        <h2>This is to inform you that a new watchlist named ${watchlistName} has been created in your account.</h2>
        <h3>For more details, login into your account.</h3>
        <br/>  

        <h2>Regards,</h2>
        <h2>Stockerzz : A Project By</h2>
        <h3>Akash Kulkarni</h3>
        <h3>Krishiv Dakwala</h3>
        <h3>Zain Shaikh</h3>
        <h3>Ashish Patil</h3>

        <h2>Happy Researching :) </h2>
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

const alertMail = (email, name) => {
  var mailOptions = {
    from: "entrepreneur2021auction@gmail.com",
    to: email,
    subject: "Alert on your Watchlist ! Check Now !!",
    html: `
      <div>
        <h1>Hello ${name}</h1>
        <h2>Greetings of the day!!</h2>
       
        <h4>This is to inform you that XYZ stock has reached the desired value which was 
            set by you. Please login to your account for further activities.
            <br>
            <br>Thank You!!
            <br>
            <br>Regards,
            <br>Stock market
        </h4>
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
  welcomeMail,
  newsMail,
  watchlistMail,
  alertMail,
};
