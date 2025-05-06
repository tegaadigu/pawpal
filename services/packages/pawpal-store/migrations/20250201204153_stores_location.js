/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create store_locations table
  await knex.schema.createTable('store_locations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('store_id').references('id').inTable('stores').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to store
    table.string('address').notNullable()
    table.string('city').nullable();
    table.string('state').nullable();
    table.string('country').nullable();
    table.string('postal_code').nullable();
    table.boolean('is_active').defaultTo(true);
    table.double('latitude').nullable();
    table.double('longitude').nullable();
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
    await knex.schema.dropTableIfExists('store_locations');
};
 