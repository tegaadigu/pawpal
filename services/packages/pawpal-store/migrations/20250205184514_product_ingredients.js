/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {

  await knex.schema.createTable('product_ingredients', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE').onUpdate('CASCADE').nullable()
    table.uuid('ingredient_id').references('id').inTable('ingredients').onDelete('CASCADE').onUpdate('CASCADE').nullable()
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
    await knex.schema.dropTableIfExists('product_ingredients');
};
 