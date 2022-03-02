
const knex = require('../controler/knex_connection')

module.exports = (Router)=>{
    ////Get All Products
    Router.get('/product',(req,res)=>{
        knex.select('*').from("product")
        .then((data) => {
            res.send(data)
        }).catch((err) => { 
        res.send( err) })
    })

    //Get All Products by ID
       Router.get('/product/:id',(req,res)=>{
        knex("product")
        .where('product_id',req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => { 
            res.send( err) 
    });
    })

    ////Get a lit of Products of Categories
    Router.get('/product/inCategory/:category_id',(req,res)=>{
        knex('product')
        .select('product.product_id',
        'product.name',
        'product.description',
        'product.price',
        "product.discounted_price",
        'product.thumbnail')
        .join('product_category','product_category.product_id','=','product.product_id')
        .where('product_category.category_id',req.params.category_id)
        .then((data)=>{
            var det = {
                'count': data.length,
                'row': data
            }
            res.send(det)
        }).catch((err)=>{
            res.send(err)
        })
    })

    
    ////Get a list of Products on Department
    Router.get('/product/inDepartment/:department_id',(req,res)=>{
        knex('product')
        .select('product.product_id',
        'product.name',
        'product.description',
        'product.price',
        "product.discounted_price",
        'product.thumbnail')
        .join('product_category', 'product.product_id','=','product_category.product_id')
        .join('category', 'product_category.category_id','=','category.category_id')
        .where('category.department_id',req.params.department_id)
        .then((data)=>{
            var det = {
                "count": data.length,
                "row": data
            }
            res.send(det)
        }).catch((err)=>{
            res.send(err)
        })
    })


    ////Get details of a Product
    Router.get('/product/:product_id/details',(req,res)=>{
        knex("product")
        .select('product_id','name','description','price','discounted_price','image','image_2')
        .where('product_id',req.params.product_id)
        .then((data) => {
            res.send(data)
        }).catch(() => { 
            var err = { error:"NotFoundError: This route don't exist!"}
            res.send(err) 
    });
    })

    ////Get locations of a Product
    Router.get('/products/:product_id/locations',(req,res)=>{
        knex
        .select("category.category_id","category.name as category_name","department.department_id","department.name as department_name")
        .from('category')
        .join('product_category','product_category.category_id','category.category_id')
        .join('department','department.department_id','category.department_id')
        .where('product_id',req.params.product_id)
        .then((data) => {
            res.send(data)  
        }).catch((err) => { 
            res.send(err) 
    });
    })

    //// post the reviews in product
    Router.post("/product/postReviews/:product_id",(req,res)=>{
        knex('review')
        .insert({
            review: req.body.review,
            rating: req.body.rating,
            created_on: new Date(),
            customer_id: '1',
            product_id: req.params.product_id
        })
        .where('product.product_id',req.params.product_id)
        .then((data) => {
            res.send(data)  
        }).catch((err) => { 
            res.send(err) 
    });
    })

    /////products/{product_id}/reviews
    Router.get("/product/reviews/:product_id",(req,res)=>{
        knex("review")
        .select("product.name","review.review","review.rating","review.created_on")
        .join('product',"review.product_id",'=','product.product_id')
        .where('product.product_id',req.params.product_id)
        .then((data) => {
            res.send(data)  
        }).catch((err) => { 
            res.send(err) 
    });
    })
}

   

