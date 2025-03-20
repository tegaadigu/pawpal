/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.alterTable('stores', (table) => {
    table.text('banner_url').alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.alterTable('stores', (table) => {
      table.string('banner_url').alter();
    });
};
 