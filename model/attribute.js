
const knex = require('../controler/knex_connection');

module.exports = (Router) => {
    // get attribute list
    Router.get('/attribute',(req,res)=>{
        knex.select('*').from("attribute")
        .then((data) => {
            res.send(data)
        }).catch((err) => { res.send( err); throw err })
        .finally(() => {
            knex.destroy();
    });
    })

    // get attribute using attribute_id
    Router.get("/attribute/:id", (req, res) => {
        knex("attribute")
        .where("attribute_id", req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    })

    
    // geting the data from attribut_value_id
    Router.get('/values/:attribute_id',(req,res)=>{
        knex.select("attribute_value_id","value")
        .from("attribute_value")
        .where("attribute_id", req.params.attribute_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
    })


    // Get all Attributes with Produt ID
    Router.get('/inproduct/:product_id',(req,res)=>{
        knex('attribute')
        .select('attribute.name','product_attribute.attribute_value_id','attribute_value.value')
        .join('attribute_value', 'attribute.attribute_id' ,'=','attribute_value.attribute_id')
        .join('product_attribute', 'attribute_value.attribute_value_id' ,'=', 'product_attribute.attribute_value_id')
        .where('product_attribute.product_id',req.params.product_id)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.send(err)
        })
    })

} 

