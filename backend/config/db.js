const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,
            {
                useUnifiedTopology:true,
              
            });
            console.log(`CONNECTED ${conn.connection.host}`)
    } catch (error) {
        
        process.exit();
    }
};

module.exports=connectDB;