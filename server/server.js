import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import mainRouter from './routes/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// use main router with /api prefix
app.use('/', mainRouter);

// connect to database
connectDB();

// Debug to ensure that mainRouter has routes
console.log("Main Router Routes: ", mainRouter.stack.map(r => r.route));

// List registered routes on the app
console.log("Registered routes:");
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        // Routes registered directly on the app
        console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
        // Router middleware
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(`${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${handler.route.path}`);
            }
        });
    }
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});