const express = require("express");
const router = express.Router();
const app = express()
const Product = require("../models/product");
const CartItem = require("../models/cartItem");
const { MetricsAgent, TracingAgent} = require("horus-agent")
TracingAgent("shopping-cart-testing")

app.use(MetricsAgent.startLatency, MetricsAgent.countRequests)


router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.json(products)
      next()
      console.log("Request IS HAPPENING")
    })
    .catch(next);
});

router.post("/products", (req, res, next) => {
  const { title, price, quantity } = req.body;
  Product.create({ title, price, quantity })
    .then((product) => {
      res.json(product)
      next()
    })
    .catch((err) => next(err));
});

router.put("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  const { title, price, quantity } = req.body;
  Product.findById(productId)
    .then((product) => {
      return Product.findByIdAndUpdate(
        productId,
        {
          title: title || product.title,
          price: price === undefined ? product.price : price,
          quantity: quantity === undefined ? product.quantity : quantity,
        },
        { new: true }
      );
    })
    .then((updatedProduct) => {
      res.json(updatedProduct);
      next()
    });
});

router.delete("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndRemove(productId)
    .then(() => {
      res.json();
      next()
    })
    .catch((err) => next(err));
});

router.post("/cart", (req, res, next) => {
  const { productId, title, price } = req.body;
  CartItem.findOne({
    productId,
  })
    .then((item) => {
      if (!item) {
        return CartItem.create({
          title: title,
          price: price,
          quantity: 1,
          productId,
        });
      } else {
        return CartItem.findOneAndUpdate(
          { productId },
          {
            quantity: item.quantity + 1,
          },
          { new: true }
        );
      }
    })
    .then((item) => {
      res.json(item);
      next()
    });
});

router.post("/cart/checkout", (req, res, next) => {
  CartItem.deleteMany({}).then(() => {
    res.json();
    next()
  });
});

router.get("/cart", (req, res, next) => {
  CartItem.find({})
    .then((cartItems) => {
      res.json(cartItems)
      next()
    })
    .catch(next);
});

app.use(MetricsAgent.countErrors, MetricsAgent.endLatency)


module.exports = router;
