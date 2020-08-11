const { Client } = require('pg');

//const connectToDb = async () => {
//  const client = new Client({ connectionString: process.env.PGURL});
//  await client.connect();
//  return client;
//}

module.exports = new Client({ connectionString: process.env.PGURL});