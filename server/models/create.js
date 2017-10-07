let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CreateSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  title: {
  	type: String,
  	required: [true, "Title is required."],
  	trim: true
  },
  start_date: {
  	type: Date,
  	required: [true, "Start date is required."]
  },
  end_date: {
    type: Date,
    required: [true, "End date is required."]
  },
  description: {
  	type: String
  },
  _Owners: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  _Members: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  _Invitees: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  messages: {
    type: Array
  }
},
   {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

let Create = mongoose.model('Create', CreateSchema);
