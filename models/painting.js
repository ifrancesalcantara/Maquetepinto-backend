const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const PaintingSchema  = new Schema ({
    image: String,
    title: {type: String, required: true},
    description: String,
    creator: String, //ID,
    creatorUsername: String,
    game: {type: String, enum: ["Legends of the Old West", "Warhammer Fantasy", "Warhammer 40k"]},
    tags: [String],
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  })

const Painting = mongoose.model("Painting", PaintingSchema)

module.exports = Painting