/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create store_hours table
  await knex.schema.createTable('store_hours', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('store_id').references('id').inTable('stores').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.string('days_of_week').notNullable()
    table.string('open_time').nullable();
    table.string('close_time').nullable();
    table.boolean('is_closed').defaultTo(false);
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
    await knex.schema.dropTableIfExists('store_hours');
};
 