import {config}  from 'dotenv';
import app from './app.js';
import cloudinary from 'cloudinary';

config();

const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(PORT, ()=>{
    console.log(`App running at http://localhost:${PORT}`);
})