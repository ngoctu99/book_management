import data from './data/users.json' with { type: 'json'};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = data;

export async function seed (knex) {
  // Deletes ALL existing entries
  // await knex('users').del();
  await knex('users').insert(users);
};
