import { body } from "express-validator";
import { validationResult } from "express-validator";

const validate_req = async (req, res, next) => {
  //data validation
  //step 1 rules for validation

  const rules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive Value"),
    body("imageUrl").isURL().withMessage("invalid url"),
  ];

  //step 2 run those rules

  await Promise.all(rules.map((rule) => rule.run(req)));

  //step 3 check if there are any error after runnng the rules
  let validationError = validationResult(req);
  //console.log(validationError.array());

  //returning the error
  if (!validationError.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationError.array()[0].msg,
    });
  }

  next();
};

export default validate_req;
