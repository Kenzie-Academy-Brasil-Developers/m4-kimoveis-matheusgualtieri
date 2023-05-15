import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import userRouters from "./routes/user.routes";
import loginRouters from "./routes/login.routes";
import categoryRouters from "./routes/category.routes";
import realEstateRouters from "./routes/realEstate.routes";
import scheduleRouters from "./routes/schedule.routes";
import { errorHandler } from "./error";

const app: Application = express();
app.use(json());

app.use("/users", userRouters);
app.use("/login", loginRouters);
app.use("/categories", categoryRouters);
app.use("/realEstate", realEstateRouters);
app.use("/schedules", scheduleRouters);

app.use(errorHandler);

export default app;
