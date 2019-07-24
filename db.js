const mongoose = require('mongoose');

mongoose.connect(
    `mongodb://viktorvoitenko:${process.env.MONGO_PASS}@ds123181.mlab.com:23181/pusherpollvvv`,
    {
        useMongoClient: true
    }
).then(()=>console.log('Connected!!!!!!!!!!'))
    .catch(err => console.log('ERR connect', err));;

let db = mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to mongodb');
});

db.on('error', (err)=>{
    console.log(err);
});

module.exports = db;