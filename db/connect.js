const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EasyBulkFulFill').then(() =>{
    console.log("database connected...........")
}).catch((err)=>{
    console.log('error',err)
})
