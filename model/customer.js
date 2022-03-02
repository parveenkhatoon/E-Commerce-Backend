const jwt = require("jsonwebtoken");
const knex = require('../controler/knex_connection')

module.exports = (Router) =>{
    // // Updating the customer data 
    Router.post("/loginSignup",(req,res)=>{
        knex.select('*').from('customer').where('email',req.body.email)
    .then((data) => {
        if(data[0]){
            res.send("email is already exist")
        }
        else{
            knex.select('*').from('customer').insert(req.body)
            .then(()=>{
                res.send(req.body)
            })
            .catch((err)=>{
                res.send(err)
            })
        }
    })
    })

    // get customers by ID.....
    Router.get("/customer/:id",(req,res)=>{
        knex.select('*').from("customer")
        .where('customer_id',req.params.id)
        .then((data)=> {
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    //Update the credit card from customer
    Router.put('/customer/updateCreditCard/:customer_id',(req,res)=>{
        knex('customer').update('credit_card',req.body.credit_card).where('customer_id',req.params.customer_id)
        .then((results)=> {
            res.status(200).send((results[0].id).toString());
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    ////Get a customer by ID. The customer is getting by Token.
    Router.get('/customers/:customer_id',(req,res)=>{
        knex.select("*").from("customer")
        .where('customer_id',req.params.customer_id)
        .then((data)=> {
            for(i of data){
                const tokan = jwt.sign({email:i.email},"parveen")
                data.push(`${tokan}`)
                res.send(data)
            } 
        })
        .catch((err)=>{
            res.send(err)
        })
    })
}

 

