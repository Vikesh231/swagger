const express = require('express');
var bodyParser = require('body-parser');  
const swagggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const app = express();
const port = 8081;


console.log("tst commit on github")

const  Connection  = require('./db/connect');
const Seller = require('./db/Seller')

app.use(bodyParser.json())
app.use(cors());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node js Project',
            version: '0.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8081/'
            }
        ]
    },
    apis: ['./server.js']
}

const swaggerSpec = swagggerJsDoc(options);
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 *  /:
 *      get:
 *          summary: hhhhThis api is used to check if get working or not
 *          description: This api is used to check if get working or not
 *          responses:
 *              200:
 *                  description: To test get
 */

app.get('/',(req,res)=>{
    res.send("Welcome to swagger api")
})

/**
 * @swagger
 *  components:
 *      schemas:
 *          Store:
 *              type: object
 *              properties:
 *                  MyShopifyDomain:
 *                      type: string
 *                  Host:
 *                      type: string
 *                  accessToken: 
 *                      type: string
 *                  installDate:
 *                      type: date
 *                  shopDetails:
 *                      type: boolean
 */



/**
 * @swagger
 *  /api/books:
 *      get:
 *          summary: hhhh To get all data from db
 *          description:  To get all data from db
 *          responses:
 *              200:
 *                  description: This api is used to fetch data from mongodb
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#components/schemas/Store"
 */


app.get('/api/books',async(req,res)=>{
    var data = await Seller.find({});
    // console.log(data);
    res.send(data)
})


/**
 * @swagger 
 *  /api/books/{accessToken}:
 *      get:
 *          summary: hhhh To get all data from db
 *          description:  To get all data from db
 *          parameters:
 *              - in: path
 *                name: accessToken     
 *                required: true
 *                description: accesstoken required
 *                schema:
 *                  type: string  
 *          responses:
 *              200:
 *                  description: This api is used to fetch data from mongodb
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#components/schemas/Store"
 */

app.get('/api/books/:accessToken',async(req,res)=>{
    var b = req.params;
    // var b = req
    console.log("b: ", b);
    var data = await Seller.find({"accessToken": b.accessToken});
    console.log(data);
    res.send(data)
    // res.send(b)
})

/**
 * @swagger
 *  /api/books/add:
 *      post:
 *          summary: insert data using post method
 *          description:  To get all data from db
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Store"
 *          responses:
 *              200:
 *                  description: Succesfully added
 */

app.post('/api/books/add',(req,res)=>{
   
    const add = new Seller({
        MyShopifyDomain: req.body.MyShopifyDomain ,
        Host: req.body.Host ,
        installDate: req.body.installDate ,
        shopDetails: req.body.shopDetails, 
        accessToken: req.body.accessToken,
        shopDetails: req.body.shopDetails       
    }) 
    const rr =  add.save()
    res.send("Succesfull added")
})

  
app.listen(port,()=>{
    console.log('server running on http://localhost:'+port);
})

