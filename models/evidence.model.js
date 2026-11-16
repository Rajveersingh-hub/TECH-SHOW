const mongoose=require('mongoose');
const evidenceSchema=new mongoose.Schema({
    type:{
        type:String,    
        enum:['Project','Certificate','Course','Internship','Other'],
        required:true,
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true, 
    },
    url:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }

});
module.exports=mongoose.model('Evidence',evidenceSchema);