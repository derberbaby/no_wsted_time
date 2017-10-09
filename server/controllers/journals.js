// require mongoose
let mongoose = require('mongoose');
// import models
let Journal = mongoose.model('Journal');
let User = mongoose.model('User');
// exporting and importing this logic into routes
module.exports = {

  findEntry: (req, res) => {
    let date = req.body.journal_date.slice(0,10)
    Journal.findOne({ '$where': 'this.date.toJSON().slice(0, 10) == "' + date  + '"', _User: req.session.user_id}, (err, journal) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (journal == null) {
                return res.sendStatus(400);
            } else {
                req.session.journal_id = journal._id;
                return res.json(journal);
            }
        }
    })
  },

  editEntry: (req, res) => {
    Journal.findOneAndUpdate({_id: req.session.journal_id}, req.body, (err, journal) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            journal = req.body;
        }
    })
  },

  newEntry: (req, res) => {
    // console.log("YAYYY");
    if (req.session.user_id) {
        let newJournal = new Journal(req.body);
        User.findOne({_id:req.session.user_id}, (err, user) => {

            if (err) {
                let errors = [];
                for (let i in err.errors) {
                    errors.push(err.errors[i].message);
                }
            return res.status(400).send(errors);
        }

        else {
            newJournal._User = req.session.user_id;
            newJournal.save ( (err, savedJournal) => {
            if (err) {
                let errors = [];
                for (let i in err.errors) {
                    errors.push(err.errors[i].message);
                }
            return res.status(400).send(errors);
            } else {
                user.journal.push(newJournal);
                user.save ( ( err, savedUser) => {
                    if (err) {
                      let errors = [];
                      for (let i in err.errors) {
                          errors.push(err.errors[i].message);
                      }
                      return res.status(400).send(errors);
                    } else {
                      return res.json(true);
                    }
                })
              }
            })
        }
        })
    }
  }
}
