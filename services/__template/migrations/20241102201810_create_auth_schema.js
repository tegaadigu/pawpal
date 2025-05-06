/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create users table
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().nullable();
    table.string('password_hash').notNullable();
    table.string('phone_number').nullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
    table.timestamp('last_login').nullable();
    table.boolean('is_active').defaultTo(true);
    table.string('role').defaultTo('user');
  });

  // Create password_resets table
  await knex.schema.createTable('password_resets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').unsigned().references('id').inTable('users');
    table.string('reset_token').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at').notNullable();
  });

  // Create sessions table
  await knex.schema.createTable('sessions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').unsigned().references('id').inTable('users');
    table.string('token').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at').notNullable();
  });

  // Create mfa table
  await knex.schema.createTable('mfa', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').unsigned().references('id').inTable('users');
    table.string('mfa_type').notNullable();
    table.boolean('mfa_enabled').defaultTo(false);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('mfa');
    await knex.schema.dropTableIfExists('sessions');
    await knex.schema.dropTableIfExists('password_resets');
    await knex.schema.dropTableIfExists('users');
};
