const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require("./config/db")
const userRoutes=require("./routes/userRoutes");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app=express();
 

app.use(cors(
    {
    // origin: ['http://localhost:3000']
    origin: "*"
}
));

app.use(express.json());
app.use("/api/user",userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(5000,console.log("Start"));
