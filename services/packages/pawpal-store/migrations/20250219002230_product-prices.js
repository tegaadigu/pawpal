/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }0
 */
export const up = async function(knex) {
  // Create store_locations table
  await knex.schema.createTable('product_prices', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.double('price').notNullable();
    table.string('currency_code').notNullable().defaultTo("CAD")
    table.jsonb('meta_data').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('product_prices');
};
 