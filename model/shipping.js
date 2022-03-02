
const knex = require("../controler/knex_connection");

module.exports =(Router)=>{
    //// get shipping regions by id
    Router.get("/shippingRegion/:id", (req, res) => {
        knex("shipping_region")
        .where("shipping_region_id", req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    })

    //// return shipping Region
    Router.get("/shipping/regions/:shipping_region_id",(req,res)=>{
        knex.select("*").from('shipping')
        .where("shipping_id", req.params.shipping_region_id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    })
}
