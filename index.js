import express from "express";
import ProductController from "./src/controllers/products.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validate_req from "./src/middleware/validation.middleware.js";
const server = express();

//set view engine seting
server.set("view engine", "ejs");
/* when given false uses query 
  string library to parse the data and when given true uses qs library to do the same.  
  Note – use of qs library is recommended. 
*/

server.use(express.urlencoded({ extended: true }));
//next we have to specify tthe path of view

const filepath = path.join(path.resolve(), "src", "views");

server.set("views", filepath);

server.use(ejsLayouts);

const productcontroller = new ProductController();

server.get("/", productcontroller.getProducts);
server.get("/add", productcontroller.getAddProducts);
server.post("/", validate_req, productcontroller.AddNewProduct);
server.get("/update-product/:id", productcontroller.getUpdateProductView);
server.post("/update-product", productcontroller.postUpdateProduct);
server.post("/delete-product/:id", productcontroller.deleteProduct);

server.use(express.static("src/views"));
server.use(express.static("public"));
server.listen(3400, () => {
  console.log("serever is up and running");
});
