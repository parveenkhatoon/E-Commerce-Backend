
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '9958975092',
    database: 'turing'
  }
})
knex.schema.hasTable('customer').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('customer', function (t) {
      t.increments('customer_id').primary();
      t.string('name', 100);
      t.string("email")
      t.string("password")
      t.string("day phone")
      t.string('eve phone')
      t.string('mob phone')
      t.string('credit_card')
    });
  }
});

knex.schema.hasTable('cart').then((exists) => {
  if (!exists) {
    return knex.schema.createTable("cart", (t) => {
      t.increments('item_id').primary();
      t.string("cart_id");
      t.string("name");
      t.integer("product_id");
      t.string("attributes");
      t.decimal("price");
      t.integer("quantity");
      t.integer("buy_now");
      t.dateTime("added_on")
    })
  }
}) 
module.exports = knex;
