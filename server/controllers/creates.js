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
        Create.findOne({_id: req.params.eventID}).populate('Owners').populate('_Members').populate('_Invitees').exec((err, details)=>{
            if(err){
                console.log(err);
                return res.status(400).send(err);
            } else {
                console.log(details)
                req.session.event_id = details._id;
                return res.json(details);
            }
        })
    },

    editTitle: (req, res) => {
        console.log("IN EDIT");
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                event.title = req.body.title;
            }
        })
    },

    editCategory: (req, res) => {
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                event.category = req.body.category;
            }
        })
    },

    editDescription: (req,res) => {
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                event.description = req.body.description;
            }
        })
    },

    editStart: (req,res) => {
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                start_date: new Date(req.body.start_date)
                event.description = start_date;
            }
        })
    },

    editEnd: (req,res) => {
        Create.findOneAndUpdate({_id: req.session.event_id}, req.body, (err, event) => {
            if(err){
                return res.status(400).send(err);
            } else {
                end_date: new Date(req.body.end_date)
                event.description = end_date;
            }
        })
    },

    addMessage: (req,res) =>{
      console.log("IN ADD MESSAGE", req.params.eventID);
      console.log("IN ADD MESSAGE 2", req.body);
      Create.findOneAndUpdate({_id: req.params.eventID}, req.body, (err, event) =>{
        if(err){
            return res.status(400).send(err);
        } else {
            event.messages.push(req.body);
            event.save((err, success)=>{
                if(err){
                    return res.status(400).send(err);
                } else {
                    console.log("Successful message push", event);
                    return res.json(event);
                }
            })
        }
      })
    },

    getAll: (req, res) => {
      Create.find({_id: req.session.event_id}, (err, event) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.json(event);
        }
    })
}

}
