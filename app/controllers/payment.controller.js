const Razorpay = require("razorpay");
const httpStatusConfig = require("../config/httpStatus.config");

const rzpInstance = new Razorpay({
  key_id: "rzp_test_51EZ1zxU862gz6",
  key_secret: 'RqQxygZY1cYJK6d2B7EkWwLX',
});

exports.createOrder = (req, res) => {
  const { amount } = req.body;

  rzpInstance.orders.create({
    amount,
    currency: "INR",
  }, (err, order) => {
    if (err) {
      return res.status(httpStatusConfig.BAD_REQUEST).send({ message: "Order creation failed!" })
    } else {
      res.status(httpStatusConfig.OK).send({ orderId: order?.id, amount: order?.amount * 100 });
    }
  })
};

exports.verifySignature = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  rzpInstance.validatePaymentVerification(
    {
      razorpay_order_id,
      razorpay_payment_id,
    },
    razorpay_signature,
    "RqQxygZY1cYJK6d2B7EkWwLX").then((data) => {
      console.log(data);
      res.status(httpStatusConfig.OK).send(true)
    }).catch(() => {
      res.status(500).send({ message: "Razorpay signature failed" })

    })
}
