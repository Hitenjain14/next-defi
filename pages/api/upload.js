//@ts-nocheck
import multer from 'multer';
import nextConnect from 'next-connect';
import Coin from '../../models/Coins';
import dbConnect from '../../utils/dbConnect';
const sharp = require('sharp');

dbConnect();

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// @ts-ignore

let uploadFile = upload.single('logo');

apiRoute.use(uploadFile);

apiRoute.post(async (req, res) => {
  if (req.file) {
    req.file.filename = req.file.fieldname + '-' + req.body.address;
  }
  try {
    const doc = await Coin.find({ address: req.body.address });
    console.log(doc);
    if (doc.length > 0) {
      res.status(404).json({
        status: 'fail',
        message: 'already exists',
      });
    } else {
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('png')
        .png({ quality: 90 })
        .toFile(`public/${req.file.filename}`);

      req.body.logo = req.file.filename;

      const doc = await Coin.create(req.body);

      res.status(200).json({
        status: 'ok',
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: 'fail',
      error: err.message,
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
