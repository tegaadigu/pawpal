/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create store_hours table
  await knex.schema.createTable('order_products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.uuid('product_id').notNullable()
    table.string('price_id').notNullable()
    table.integer('quantity').notNullable()
    table.double('amount').nullable();
    table.jsonb('meta_data').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();


    table.index('product_id', 'order_products_product_id_idx');
    table.index('price_id', 'order_products_price_id_idx');

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('order_products');
};
 