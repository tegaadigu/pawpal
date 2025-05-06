/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.table('products', (table) => {
    table.jsonb('meta_data').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.alterTable('products', (table) => {
      table.dropColumn('meta_data');
    });
};
 