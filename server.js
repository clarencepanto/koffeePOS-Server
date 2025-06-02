import express from "express";
import cors from "cors";
import ingredientOrderRoutes from "./routes/ingredient_orders-routes.js";
import ingredientsRoutes from "./routes/ingredients-routes.js";
import productsRoutes from "./routes/products-routes.js";
import recipesRoutes from "./routes/recipes-routes.js";
import salesRoutes from "./routes/sales-routes.js";
import suppliersRoutes from "./routes/suppliers-routes.js";
import userRoutes from "./routes/users-routes.js";
import salesRecord from "./routes/salesrecord-routes.js";
import restockRecords from "./routes/restockrecord-routes.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const logRequest = (req, res, next) => {
  console.log(`Request: ${req.method} for ${req.path}`);
  next();
};
const PORT = 8080;

app.use(express.json());
app.use(logRequest);
app.use(cors());

app.use("/ingredient_orders", ingredientOrderRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/products", productsRoutes);
app.use("/recipes", recipesRoutes);
app.use("/sales", salesRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/users", userRoutes);
app.use("/salesrecord", salesRecord);
app.use("/restockrecord", restockRecords);

// Create HTTP server from Express app
const server = http.createServer(app);

// establish connection real time updates in the front end
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

export { io };
