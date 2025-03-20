/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable('users', (table) => {

    table.index('email', 'users_email_idx');
    table.index('phone_number', 'users_phone_number_idx');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  // Drop tables in reverse order
  return knex.schema.alterTable('users', (table) => {
    // Remove indexes if rolling back
    table.dropIndex('email', 'users_email_idx');
    table.dropIndex('phone_number', 'users_phone_number_idx');
  });
};