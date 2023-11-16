// main.seed.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../database/data-source';

const dataSource = new DataSource(dataSourceOptions);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source connect', err);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();

    console.log('Data Source disconnected!');
  } catch (err) {
    console.error('Error during Data Source disconnect', err);
  }
}

async function runSeed() {
  await connect();
  console.log('connected');
  await disconnect();
  console.log('disconnected');
}

runSeed();
