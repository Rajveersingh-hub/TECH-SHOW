const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    bio:{
        type:String,
        required:true
    },
    image:{
        // url of the image
        type:String,
        required:true
    },
    location: {
    city: String,
    state: String,
    country: String

},
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
})
module.exports = mongoose.model("Profile", profileSchema);
