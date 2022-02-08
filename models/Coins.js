const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'A address is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A price is required'],
  },
  symbol: {
    type: String,
    required: [true, 'A symbol is required'],
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Coin || mongoose.model('Coin', coinSchema);

//0x73BD9DA86264c9a1C25f5db4c7759560612DFAe7 Super Man
//0x959C2Bd278DF57aC12D8411D9b167976ed309548 Iron Man
// 0x885ca2F73ebcf4deDcfb54e4A4aC49DB6123bf70 spider man
//0x280d91Ab8cCA428CF32992de909868249743D6E5 squid games
//0x95EEef28449e44B10d2d119afBFd7C7CE32AB026 dino gaming

// rzp_test_8axYuImu2N6K4d
// b6N1jeuF1K9LUfeXDBRGpxcZ
