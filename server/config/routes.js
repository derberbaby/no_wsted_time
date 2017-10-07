var users = require('./../controllers/users.js');
var creates = require('./../controllers/creates.js');
var journals = require('./../controllers/journals.js');

module.exports = (app) => {
  app.post('/api/login', users.login);

  app.post('/api/register', users.register);

  app.get('/api/user', users.check_session_user);

  app.get('/api/logout', users.logout);

  app.post('/api/creates', creates.new_thing);

  app.post('/api/add_journal_entry', journals.newEntry);

  app.post('/api/find_journal_entry', journals.findEntry);

  app.post('/api/edit_journal_entry', journals.editEntry);

  app.get('/api/tasks', users.getTasks);

  app.post('/api/tasks/addTasks', users.addTasks);

  app.post('/api/invite/:event_id', users.inviteFriend);

  app.post('/api/getEvents', creates.eventList);

  app.get('/api/details/:eventID', creates.eventDetails);

  app.post('/api/edit/title/:eventID', creates.editTitle);

  app.post('/api/edit/category/:eventID', creates.editCategory);

  app.post('/api/edit/description/:eventID', creates.editDescription);

  app.post('/api/edit/start/:eventID', creates.editStart);

  app.post('/api/edit/end/:eventID', creates.editEnd);

  app.post('/api/messages/add/:eventID', creates.addMessage);
  
  app.get('/api/get_all_messages', creates.getAll);

  app.post('/api/acceptInvite', users.acceptInvite);

  app.post('/api/rejectInvite', users.rejectInvite);
}
