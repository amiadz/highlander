import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import coorRouter from "./routers/coordinare-router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

const routers = [coorRouter]

routers.forEach(router => {
    app.use(coorRouter)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
