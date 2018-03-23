const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "An email address is required!",
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email"]
  },
  name: {
    type: String,
    trim: true,
    required: "A name is required!"
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  customer_id: {
    type: String,
    unique: true
  },
  payments: {
    type: Array
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual("gravatar").get(function() {
	const hash = md5(this.email);
  return `https://en.gravatar.com/avatar/${hash}?s=100`;
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
UserSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", UserSchema);
