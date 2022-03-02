
const knex = require('../controler/knex_connection')

module.exports = (Router)=>{
    ////Generete the unique CART ID
    Router.get('/shoppingcart/generateUniqueId',(req,res)=>{
        var text =" "
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        for(var i=0; i<10;i++){
            text += str.charAt(Math.floor(Math.random()*str.length))
        }
        var cart_id = {
            "cart_id":text
        }
        res.send(cart_id)
    })


    //// Add to shopping cart
Router.post("/shopping_cart/add", (req, res) => {
        var id = Math.round((Math.random() * 100) + 1);
        var cart_id = id;
        var add_data = {
        "cart_id": cart_id,
        "product_id": req.body.product_id,
        "attributes": req.body.attributes,
        "quantity": req.body.quantity,
        "added_on": new Date()
        }
        knex("shopping_cart").insert(add_data)
        .then(() => {
            knex.select("item_id", "name", "attributes", "shopping_cart.product_id", "price", "quantity", "image")
            .from("shopping_cart")
            .join("product","shopping_cart.product_id", "=", "product.product_id")
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err)
            })
        })
    })

    ////Get List of Products in Shopping Cart
    Router.get("/shopping_cart/:cart_id",(req,res)=>{
        knex.select('*').from('shopping_cart')
        .join('product',"shopping_cart.product_id","=","product.product_id")
        .where('cart_id',req.params.cart_id)
        .then((data)=>{
            data1 = {
                "item_id": data[0].item_id,
                "name": data[0].name,
                "attributes": data[0].attributes,
                "product_id": data[0].product_id,
                "price": data[0].price,
                "quantity": data[0].quantity,
                "image": data[0].image,
                "subtotal": data[0].subtotal
            
            }
            res.send(data1)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    ////Update the cart by item
    Router.put('/shoppingcart/update/:item_id',(req,res)=>{
        knex.select('*').from('shopping_cart')
        .where('item_id',req.params.item_id)
        .update(req.body)
        .then((data)=>{
            res.send("data is updated successfully")
        })
        .catch((err)=>{
            res.send(err)
        })
    })


    //// Empth cart
    Router.delete('/shoppingcart/empty/:cart_id',(req,res)=>{
        knex.select('*').from('shopping_cart')
        .where('cart_id',req.params.cart_id)
        .delete(req.params.cart_id)
        .then((data)=>{
            res.send("data is deleted successfully")
        })
        .catch((err)=>{
            res.send(err)
        })
    })
    //// Move a product to cart
    Router.get('/shoppingcart/moveToCart/:item_id',(req,res)=>{
        knex('shopping_cart')
        .join('product','shopping_cart.product_id','product.product_id')
        .select("shopping_cart.item_id", "product.name", "shopping_cart.attributes", "shopping_cart.product_id",
                "product.price", "shopping_cart.quantity", "shopping_cart.cart_id")
        .where('shopping_cart.item_id',req.params.item_id)
        .then((data)=>{
            knex('cart').insert(data)
            .where("cart.item_id", req.params.item_id)
            .then(()=>{
                res.send("data inserted....")
            })
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    //// Return the totel amount from cart
    Router.get('/shoppingcart/totalAmount/:cart_id',(req,res)=>{
        knex.select('price','quantity').from('shopping_cart')
        .join('product','shopping_cart.product_id','product.product_id')
        .where('shopping_cart.cart_id',req.params.cart_id)
        .then((data)=>{
            let total_Amount = []
            let obj ={
                "total_Amount": data[0].price * data[0].quantity
            }
            total_Amount.push(obj)
            res.send(total_Amount)
            
        })
        .catch((err)=>{
            res.send(err)
        })
    })
}