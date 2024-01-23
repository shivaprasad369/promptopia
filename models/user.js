const { Schema, models, model } = require("mongoose");

const UserSchema=new Schema({
    email:{
        type:String,
        unique:[true,'EMail is already existed'],
        required:[true,'Email is required']
    },
    userName:{
        type:String,
        required:[true,'User name is required'],
        },
    image: {
        type: String,
      }
})
const User=models.User || model('User',UserSchema)
export default User;