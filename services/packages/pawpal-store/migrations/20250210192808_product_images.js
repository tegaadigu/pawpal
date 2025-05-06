/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }0
 */
export const up = async function(knex) {
  // Create store_locations table
  await knex.schema.createTable('product_images', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.text('path').notNullable()
    table.boolean('is_active').defaultTo(true);
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
    await knex.schema.dropTableIfExists('product_images');
};
 