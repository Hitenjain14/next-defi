import dbConnect from '../../utils/dbConnect';
import Coin from '../../models/Coins';

dbConnect();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const doc = await Coin.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          doc,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
  if (req.method === 'GET') {
    console.log('request');
    try {
      const doc = await Coin.find();
      res.status(200).send(doc);
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
};
