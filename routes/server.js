const express = require('express')
const app = express()
const Router = express.Router()
const port = 3000
const bodyparser = require('body-parser')
app.use(express.json())
app.use('/', Router)

require('../model/department')(Router)
require('../model/category')(Router)
require('../model/attribute')(Router)
require('../model/customer')(Router)
require('../model/product')(Router)
require('../model/tax')(Router)
require('../model/shipping')(Router)
require('../model/shoppingcard')(Router)
app.listen(port, () => console.log(`server is listening on port ${port}`))

