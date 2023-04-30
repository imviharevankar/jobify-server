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
      res.status(httpStatusConfig.OK).send({ orderId: order?.id, amount: order?.amount });
    }
  })
};

exports.verifySignature = (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log(signature);
  rzpInstance.validatePaymentVerification(
    {
      "order_id": orderId,
      "payment_id": paymentId,
    },
    signature,
    "RqQxygZY1cYJK6d2B7EkWwLX").then((data) => {
      console.log(data);
      res.status(httpStatusConfig.OK).send(true)
    }).catch(() => {
      res.status(500).send({ message: "Razorpay signature failed" })

    })
}
