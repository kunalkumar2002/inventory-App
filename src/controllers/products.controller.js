import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    //console.log(products);
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

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const { id } = req.params;
    // console.log(id);
    const productFound = ProductModel.getById(id);
    // console.log(productFound);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res) {
    // console.log(req.body);
    ProductModel.update(req.body);

    let products = ProductModel.get();
    //console.log(products);
    return res.render("products", { products: products });
  }
  deleteProduct(req, res) {
    const { id } = req.params;
    console.log(id);
    const productFound = ProductModel.getById(id);
    // console.log(productFound);
    if (!productFound) {
      return res.status(401).send("product not found");
    }

    ProductModel.delete(id);
    let products = ProductModel.get();
    //console.log(products);
    return res.render("products", { products: products });
  }
}
