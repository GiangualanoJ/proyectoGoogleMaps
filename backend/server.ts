import express from "express";
import mongoose from "mongoose";

import router from "./routes/maps";

const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/googleMaps', {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log('Error connecting to MongoDB ', err);
});


app.use(express.json());
app.use("/maps", router);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})