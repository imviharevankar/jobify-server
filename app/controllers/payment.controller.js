const Razorpay = require("razorpay");
const crypto = require("crypto");
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

  const key_secret = 'RqQxygZY1cYJK6d2B7EkWwLX';

  // STEP 8: Verification & Send Response to User

  // Creating hmac object 
  let hmac = crypto.createHmac('sha256', key_secret);

  // Passing the data to be hashed
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

  // Creating the hmac in the required format
  const generated_signature = hmac.digest('hex');


  if (razorpay_signature === generated_signature) {
    res.status(httpStatusConfig.OK).json({ success: true, message: "Payment has been verified" })
  }
  else {
    res.json({ success: false, message: "Payment verification failed" })
  }

}
