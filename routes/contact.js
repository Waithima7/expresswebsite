var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

router.post('/send',function (req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail', //Email Server
        auth:{
            user:'YourEmail@Server.com',//Email Address
            pass:'Password',//Email Password
        },
    });


    var mainOptions = {
        from: 'Ngugi Waithima <waithimamoses@gmail.com>',
        to: 'waithimamoses@gmail.com',
        subject: 'Testing Sending NodeMailer',
        text: 'We have a new submission from your form on the test website. Thank you!' + req.body.name
        +' Email: '+req.body.email + '  Message: '+req.body.message,
        html:'<p>You\'ve got a new submission with the following details</p> ' +
            '<ul><li> Name: '+req.body.name+'</li></ul><ul><li>Email: '+req.body.email+
            '</li><li>Message: '+req.body.message+'</li></ul>',
    }

    transporter.sendMail(mainOptions, function (error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }
        else{
            console.log('Message Sent!  ' + info.response);
            res.redirect('/');
        }
    })
});

module.exports = router;