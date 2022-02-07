const Razorpay = require('razorpay');
const shortid = require('shortid');
import Coin from '../../models/Coins';

var instance = new Razorpay({
  key_id: 'rzp_test_8axYuImu2N6K4d',
  key_secret: 'b6N1jeuF1K9LUfeXDBRGpxcZ',
});

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const doc = await Coin.findOne({ address: req.body.address });

      let tokens = req.body.tokens;
      const amnt = doc.price * tokens * 100;
      const response = await instance.orders.create({
        amount: amnt,
        currency: 'INR',
        receipt: shortid.generate(),
        notes: {
          tokenAddress: req.body.address,
          tokenAmount: req.body.tokens,
          walletAddress: req.body.walletAddress,
        },
      });
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        notes: response.notes,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
      });
    }
  }
};
