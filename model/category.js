const knex = require('../controler/knex_connection');

module.exports = (Router) => {
    // // get categories data
    Router.get('/category', (req, res) => {
        knex.select('*').from('category')
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    })


    // get categories data total count and row
    Router.get('/category', (req, res) => {
        knex.select('*').from('category')
            .then((data) => {
                var wholedata = {
                    "count": data.length,
                    "rows": data
                }
                res.send(wholedata)
            })
            .catch((err) => {
                res.send(err)
            })
    })



//     // get categories of a product
    Router.get('/category/inProduct/:product_id', (req, res) => {
        knex.select('*')
            .from("product")
            .innerJoin('category', 'category_id', 'product_id')
            .where('category_id', req.params.product_id)
            .then((data) => {
                var obj = {
                    'category_id': data[0].category_id,
                    "department_id": data[0].department_id,
                    "name": data[0].name
                }
                res.send(obj)
            })
            .catch((err) => {
                res.send(err)
            })
    })

    Router.get('/categories/inDepartment/:department_id', (req,res)=>{
        knex.select('*')
            .from("department")
            .join('category', 'category_id', 'department_id')
            .where('category_id', req.params.department_id)
            .then((data) => {
                var obj = {
                    'category_id': data[0].category_id,
                    "description": data[0].description,
                    "department_id": data[0].department_id,
                    "name": data[0].name
                }
                res.send(obj)
            })
            .catch((err) => {
                res.send(err)
            })
    })

}







