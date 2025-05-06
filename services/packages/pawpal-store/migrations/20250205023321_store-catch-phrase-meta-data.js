/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.alterTable('stores', (table) => {
    table.string('catch_phrase').nullable();
    table.jsonb('meta_data').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.alterTable('stores', (table) => {
      table.dropColumn('catch_phrase');
      table.dropColumn('meta_data');
    });
};
 