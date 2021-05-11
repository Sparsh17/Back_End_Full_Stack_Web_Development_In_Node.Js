const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));


// // middleware 1
// app.use(function(req,res,next){
//     req.myName = "Sparsh";
//     // console.log("middleware 1 called");
//     next();
// })

// // middleware 2
// app.use(function(req,res,next){
//     console.log("My name from Mid2: ",req.myName);
//     // console.log("middleware 2 called");
//     next();
// })


var contactList = [
    {
        name: "Sparsh",
        phone: "9999999999"
    },
    {
        name: "Samar",
        phone: "1234567891"
    },
    {
        name: "Varun",
        phone: "1987654321"
    }
];

app.get('/',function(req, res){
    // console.log("from get route controller",req.myName);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title: "Contacts List",
            contact_list: contacts
        });
    })
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Play with ejs"
    });
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error is creating a contact: ');
            return;
        }

        console.log('============================',newContact);
        return res.redirect('back');
    })

    // return res.redirect('/');

    // return res.redirect('back');
})

// for deleting a contact
app.get('/delete-contact', function(req,res){
    // get the id from query in the url
    let id = req.query.id;

    // find the contact in db using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });



    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Express Server is running on : ',port);
})