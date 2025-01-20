/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
   // Create users table
   await knex.schema.createTable('places', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').nullable();
    table.string('description').notNullable();
    table.string('phone_number').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).nullable();
    table.string('user_id').notNullable();
    table.double('longitude').notNullable();
    table.double('latitude').notNullable();
    table.double('rating').nullable();
    table.string('website').nullable();
    table.string('type').nullable();
    table.boolean('is_active').defaultTo(true);


    table.index(['name', 'latitude', 'longitude'], 'unique_name_lat_lon', { unique: true })
    table.index(['latitude', 'longitude'], 'idx_places_lat_lon')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
  await knex.schema.table('places', table => {
    table.dropIndex(['name', 'latitude', 'longitude'], 'unique_name_lat_lon')
    table.dropIndex(['latitude', 'longitude', 'idx_places_lat_lon'])
  })
  await knex.schema.dropTableIfExists('places');
};
