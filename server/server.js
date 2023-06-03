import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import router from './src/routes/router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);

const port = process.env.PORT || 8080;
const server = http.createServer(app);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Conection to DataBase Successfull');
        server.listen(port, () => {
            console.log(`Server runing o port: ${port}`);
        });
    })
    .catch((err) => {
        console.log({ err });
        process.exit(1);
    });
