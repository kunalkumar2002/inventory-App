import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    // const pathofFile = path.join(
    //   path.resolve(),
    //   "src",
    //   "views",
    //   "products.html"
    // );

    // return res.sendFile(pathofFile);

    //in place of sending path now we use render fun to render ejs file and send products data.

    return res.render("products", { products: products });
  }

  getAddProducts(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  AddNewProduct(req, res) {
    
    //accessing form data
    let products = ProductModel.get();
    // console.log(req.body);
    ProductModel.add(req.body);
    return res.render("products", { products: products });
  }
}
