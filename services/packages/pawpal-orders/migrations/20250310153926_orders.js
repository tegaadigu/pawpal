const ORDER_STATUS = ["pending", "shipped", "paid", "canceled"];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').nullable()
    table.uuid('store_id').nullable() //foreign key to store
    table.double('total_amount').notNullable();
    table.string('currency').notNullable();
    table.string('status').defaultTo("pending").checkIn(ORDER_STATUS);
    table.jsonb('meta_data').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();


    table.index('store_id', 'orders_store_id_idx');
    table.index('user_id', 'orders_user_id_idx');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('orders');
};
 