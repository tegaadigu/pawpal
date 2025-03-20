/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    // cursor based pagination using created_at
    table.index('created_at', 'products_created_at_idx');

    // Index for searching by name
    table.index('name', 'products_name_idx');

    // Indexes for foreign keys to speed up joins & lookups
    table.index('store_id', 'products_store_id_idx');
    table.index('category_id', 'products_category_id_idx');
    table.index('store_location_id', 'products_store_location_id_idx');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  // Drop tables in reverse order
  return knex.schema.alterTable('products', (table) => {
    // Remove indexes if rolling back
    table.dropIndex('created_at', 'products_created_at_idx');
    table.dropIndex('name', 'products_name_idx');
    table.dropIndex('store_id', 'products_store_id_idx');
    table.dropIndex('category_id', 'products_category_id_idx');
    table.dropIndex('store_location_id', 'products_store_location_id_idx');
  });
};