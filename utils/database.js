const { default: mongoose } = require("mongoose");

let isConnected=false;
export const connectToDb=async()=>{
    mongoose.set('strictQuery',true)
   if(isConnected){
    console.log('mongo db connected')
    return;
   }
   try {
    await mongoose.connect('mongodb://127.0.0.1:27017/shared_post')
        isConnected=true;
        console.log('db connected')
   } catch (error) {
    console.log(error)
   }
}