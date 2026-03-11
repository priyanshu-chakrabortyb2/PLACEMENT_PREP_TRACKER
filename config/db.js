const mongoose=require("mongoose")
const connectDB= async()=>{
    try {
        //Connect to datatbase . All details stored in env file
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB;