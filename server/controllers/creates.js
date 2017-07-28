// require mongoose
let mongoose = require('mongoose');
// import models
let Create = mongoose.model('Create');
let User = mongoose.model('User');
// exporting and importing this logic into routes
module.exports = {

  new_thing: (req, res) => {
    console.log(req.body);
    if (req.session.user_id) {
        let newThing = new Create(req.body);
        newThing._Owners.push(req.session.user_id);
        newThing._Members.push(req.session.user_id);
        newThing.save( (err, savedThing) => {
            if (err) {
                console.log('back', err);
                let errors = [];
                for (let i in err.errors) {
                    errors.push(err.errors[i].message);
                }
                return res.status(400).send(errors);
            }
            else {
                User.findOne({_id: req.session.user_id}, (err, user) => {
                    if (err) {
                        console.log('back', err);
                        let errors = [];
                        for (let i in err.errors) {
                            errors.push(err.errors[i].message);
                        }
                        return res.status(400).send(errors);
                    }
                    else {
                        user.hosting.push(savedThing);
                        user.attending.push(savedThing);
                        user.save( (err, savedUser) => {
                            if (err) {
                                console.log('back', err);
                                let errors = [];
                                for (let i in err.errors) {
                                    errors.push(err.errors[i].message);
                                }
                                return res.status(400).send(errors);
                            }
                            else {
                                return res.json(savedUser);
                            }
                        })
                    }
                })
            }
        })
    }
},

    eventList: (req,res)=>{
        console.log("IN CONTROLLER CREATE");
        if(req.session.user_id){
            let date = req.body.date.slice(0,10);
            Create.find({ '$where': 'this.start_date.toJSON().slice(0, 10) == "' + date  + '"', _Members: req.session.user_id}, (err, events)=>{
                if (err){
                    console.log(err);
                    return res.status(400).send(err);
                } else {
                    return res.json(events);
                }
            })
        }
    },
    eventDetails: (req,res) =>{
        Create.findOne({_id: req.params.eventID}).populate('Owners').populate('_Members').exec((err, details)=>{
            if(err){
                console.log(err);
                return res.status(400).send(err);
            } else {
                req.session.event_id = details._id;
                return res.json(details);
            }
        })
    },

    editEvent: (req, res) => {
        console.log("IN EDIT");
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                event = req.body;
            }
        })
    }
}
