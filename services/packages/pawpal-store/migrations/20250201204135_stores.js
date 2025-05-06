/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.createTable('stores', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('slug').notNullable().unique();  // unqiue url to the store to be accessed via url.
    table.string('description').nullable();
    table.string('phone_number').nullable();
    table.string('banner_url').nullable();
    table.string('logo_url').nullable();
    table.boolean('is_active').defaultTo(true);
    table.string('owner_id').notNullable(); // Foreign key to user table in auth / user service.
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
    await knex.schema.dropTableIfExists('stores');
};
 