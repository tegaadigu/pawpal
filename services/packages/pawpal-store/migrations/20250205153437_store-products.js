/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {

  await knex.schema.createTable('product_category', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable()
    table.text('description').nullable();
    table.jsonb('meta_data').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
  });

  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('store_id').references('id').inTable('stores').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.uuid('category_id').references('id').inTable('product_category').onDelete('CASCADE').onUpdate('CASCADE').nullable()
    table.string('name').notNullable()
    table.double('price').nullable();
    table.text('description').nullable();
    table.uuid('store_location_id').references('id').inTable('store_locations').onDelete('CASCADE').onUpdate('CASCADE').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
  });

  await knex.schema.createTable('ingredients', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('name').notNullable()
    table.text('description').nullable();
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
    await knex.schema.dropTableIfExists('product_category');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('ingredients');
};
 