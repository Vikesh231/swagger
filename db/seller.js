const mongoose = require('mongoose');

const Seller = mongoose.Schema({
    
    MyShopifyDomain:{
        type:String
    },
    Host:{
        type: String
    },
    accessToken:{
        type:String
    },
    installDate:{
        type: Date
     },
   
     shopDetails:{
         type:Boolean
        },
        // scope:{
            // type:String
        // },
   
    
    
})
module.exports = mongoose.model('Seller', Seller);