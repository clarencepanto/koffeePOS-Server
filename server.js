import express from "express";
import cors from "cors";
import ingredientOrderRoutes from "./routes/ingredient_orders-routes.js";
import ingredientsRoutes from "./routes/ingredients-routes.js";
import productsRoutes from "./routes/products-routes.js";
import recipesRoutes from "./routes/recipes-routes.js";
import salesRoutes from "./routes/sales-routes.js";
import suppliersRoutes from "./routes/suppliers-routes.js";
import userRoutes from "./routes/users-routes.js";

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

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
