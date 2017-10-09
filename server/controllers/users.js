let mongoose = require('mongoose');
let User = mongoose.model('User');
let Create = mongoose.model('Create');

let bcrypt = require('bcryptjs');

module.exports = {

  login: (req, res) => {
    User.findOne({email: req.body.email}, (err, user_login) => {
      if(user_login == null) {
      	let errors = ["Email does not exist. Please register."];
        return res.status(400).send(errors);
      }
      else{
        if(bcrypt.compareSync(req.body.password, user_login.password)) {
          req.session.user_id = user_login._id;
          return res.json(true);
        }
        else {
          let errors = ["Incorrect password."];
          return res.status(400).send(errors);
        }
      }
    })
  },

  register: (req, res) => {
    User.findOne({email: req.body.email}, (err, foundUser) => {
      if(err) {
        let errors = [];
        for(let i in err.errors){
          errors.push(err.errors[i].message);
        }
        return res.status(400).send(errors);
      } else {
        if(foundUser == null) {
          // user does not exist in db
          let user = new User(req.body);
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
          user.save( (err, savedUser) => {
            if(err) {
              let errors = [];
              for(let i in err.errors) {
                errors.push(err.errors[i].message);
              }
              return res.status(400).send(errors);
            } else {
              req.session.user_id = savedUser._id
              return res.json(savedUser);
            }
          })
        } else {
          // email already exists in db
          let errors = ["Email already registered, please log in."];
          return res.status(400).send(errors);
        }
      }
    })
  },

  check_session_user: (req, res) => {
    if (req.session.user_id) {
      User.findOne({_id: req.session.user_id}).populate('pending').exec( (err, user) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.json(user);
        }
      })
    } else {
      return res.sendStatus(400);
    }
  },

  addTasks: (req, res) => {
    User.findOne({_id: req.session.user_id}, (err,user) => {
      if(err){
        return res.status(400).send(err);
      } else {
        // console.log(req.body);
        user.tasks = req.body;
        user.save( (err, savedTasks) => {
          if(err){
            let err = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message)
            }
            return res.status(400).send(errors)
          } else {
            return res.json(savedTasks)
          }
        })
      }
    })
  },

  getTasks: (req,res) => {
    User.findOne({_id: req.session.user_id}, (err,user) => {
      if(err){
        let errors = [];
        for( let i in err.errors){
          errors.push(err.errors[i].message);
        }
        return res.status(400).send(errors);
      } else {
        return res.json(user.tasks);
      }
    })
  },

  acceptInvite: (req, res) => {
    User.findOne({_id: req.session.user_id}, (err, user) => {
      if (err) {
        return res.sendStatus(400);
      } else {
        Create.findOne({_id: user.pending[req.body.index]}, (err, event) => {
          if (err) {
            return res.sendStatus(400);
          } else {
            event._Members.push(user._id);
            let index = event._Invitees.indexOf(user._id);
            if (index != -1) {
              event._Invitees.splice(index, 1);
              event.save( (err, savedEvent) => {
                if(err) {
                  return res.sendStatus(400);
                } else {
                  user.attending.push(event._id);
                  user.pending.splice(req.body.index, 1);
                  user.save ( (err, savedUser) => {
                    if (err) {
                      // console.log("FAILED");
                      return res.sendStatus(400);
                    } else {
                      // console.log("SUCCESS", user);
                      // console.log("EVENT", savedEvent);
                      return res.json(user);
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  rejectInvite: (req, res) => {
    User.findOne({_id: req.session.user_id}, (err, user) => {
      if (err) {
        return res.sendStatus(400);
      } else {
        Create.findOne({_id: user.pending[req.body.index]}, (err, event) => {
          if (err) {
            return res.sendStatus(400);
          } else {
            let index = event._Invitees.indexOf(user._id);
            if (index != -1) {
              event._Invitees.splice(index, 1);
              event.save( (err, savedEvent) => {
                user.pending.splice(req.body.index, 1);
                user.save( (err, savedUser) => {
                  if (err) {
                    return res.sendStatus(400);
                  } else {
                    return res.json(user);
                  }
                })
              })
            }
          }
        })
      }
    })
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.json(true);
  },

  inviteFriend: (req, res) => {
    console.log("in controller!", req.body.email);
    User.findOne({email: req.body.email}, (err,friend) => {
      // console.log("found friend", friend);
      if(err) {
        let errors=[];
        for(let i in err.errors) {
          errors.push(err.errors[i].message);
        }
        return res.status(400).send(errors);
      } else {
        // console.log("in query", req.params);
        Create.findOne({_id: req.params.event_id}, (err,event) => {
          // console.log("found event", event);
          if(err) {
            let errors=[];
            for(let i in err.errors) {
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
          } else {
            event._Invitees.push(friend._id);
            event.save( (err) => {
              if(err) {
                let errors=[];
                for(let i in err.errors) {
                  errors.push(err.errors[i].message);
                }
                return res.status(400).send(errors);
              } else {
                friend.pending.push(event._id);
                friend.save( (err) => {
                  if(err) {
                    let errors=[];
                    for(let i in err.errors) {
                      errors.push(err.errors[i].message);
                    }
                    return res.status(400).send(errors);
                  } else {
                    // console.log("successfully saved friend to event", event)
                    return res.json(true);
                  }
                })
              }
            })
          }
        })
      }
    })
  }

}
