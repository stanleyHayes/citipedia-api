import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/users.js";
import challengeRoutes from './routes/challenges.js';
import authenticationRoutes from "./routes/authentication.js";

dotenv.config({
    path: `./config/config.env`
});

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    autoIndex: false
}).then(response => {
    console.log(`Connected to MongoDB on host ${response.connections[0].host}`);
}).catch(error => {
    if (!error) {
        console.log(`Error: ${error.message}`);
    }
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/v1/auth', authenticationRoutes);
app.use('/api/v1/challenges', challengeRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} on port ${PORT}`);
});