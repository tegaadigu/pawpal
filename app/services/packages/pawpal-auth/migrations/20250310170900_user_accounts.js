/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create users table
  await knex.schema.createTable('user_account', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('country').nullable();
    table.string('address').nullable();
    table.string('city').nullable();
    table.string('state').nullable();
    table.string('postal_code').nullable();
    table.boolean('is_active').defaultTo(true);
    table.jsonb('meta_data').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('user_account');
};
 