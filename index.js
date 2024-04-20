const express = require("express")
const dotenv = require("dotenv")
const {mongoose} = require("mongoose")
const bodyParser = require("body-parser")

const docRoute = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes")

const app = express();
dotenv.config();
app.use(express.json());


const connectDb = async() => {
    try{
        const connect = await mongoose.connect(process.env.MONOGO_URI);
        console.log("Server is Connected to Db")
    }catch(err){
        console.log("Server is not Connected to Db", err.message)
    }
}

connectDb();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("API is Runinig");
});

app.use("/doc",docRoute);
app.use("/", appointmentRoutes);

const MONOGO_URI = process.env.MONOGO_URI;

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is Running...", PORT));

