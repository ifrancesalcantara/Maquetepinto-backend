const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema  = new Schema ({
    dateOfCreation: Date,
    username: {type: String, required: true},
    paintings: [{type: String, ref: "Painting"}], //Must be an ID
    delivers: Boolean,
    mounts: Boolean,
    profilePic: String,
    techniques: [String]
},{
    timestamps: { createdAt: "created_at" }
  })

const User = mongoose.model("User", userSchema)

module.exports = User