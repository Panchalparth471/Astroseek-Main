const express = require("express");
const app = express();
const { database } = require("./Config/database");
const { cloudinaryConnect } = require("./Config/cloudinary");
const cors = require("cors");
const routes = require("./Routes/routes");
const fileUpload = require("express-fileupload");
const cloudinary = require("./Config/cloudinary");
//For uploading files temporarily in our server


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'/tmp/'
}))

app.use(
    cors()
)

app.use(express.json());
require("dotenv").config();


const PORT = process.env.PORT;
app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log("SERVER STARTED");
})

app.get("/", (req, res) => {
    res.send('<h1>The Server is Up and Running</h1>');
})

database();
cloudinary.cloudinaryConnect();
