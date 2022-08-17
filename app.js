const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDOc = require('swagger-jsdoc')
const port = 5000;


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "customer API",
            description: "customer API information",
            contact :  {
                name: "Amazing developer"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["app.js"]
};
const swaggerDocs = swaggerJsDOc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *   description: use to request to all customer
 *   responses: 
 *    '200':
 *      description: A succesful response
 */

app.get("/customers",(req,res)=>{
    res.send("swagger api")
})

/**
 * @swagger
 * /customers:
 *  put:
 *   description: use to request to update a customer
 *   responses: 
 *    '201':
 *      description: A succesful response
 */

 app.put("/customers",(req,res)=>{
    res.send(" put reqswagger api")
})
app.listen(port,()=> console.log('server running http://localhost:'+port))

