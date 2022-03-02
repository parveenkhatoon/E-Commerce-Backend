
const knex = require('../controler/knex_connection')

module.exports = (Router)=>{
    ////Get All Taxes
    Router.get('/tax',(req,res)=>{
        knex.select('*').from("tax")
        .then((data) => {
            res.send(data)
        }).catch((err) => { res.send( err); throw err })
        .finally(() => {
            knex.destroy();
    });
    })

    /////tax/{tax_id}
    Router.get('/tax/:tax_id',(req,res)=>{
        knex.select('*').from("tax").where('tax_id',req.params.tax_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => { res.send( err); throw err })
    });
}
