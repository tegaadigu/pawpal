/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  // Create stores table
  await knex.schema.createTable('payments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').nullable() //foreign key to store
    table.uuid('order_id').nullable() //foreign key to store
    table.text('payment_intent_id').nullable();
    table.text('charge_id').nullable();
    table.double('amount').notNullable();
    table.string('currency').notNullable();
    table.text('status').defaultTo(true);
    table.string('payment_method').notNullable();
    table.string('customer_email').notNullable();
    table.text('receipt_url').nullable();
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
    await knex.schema.dropTableIfExists('payments');
};
 