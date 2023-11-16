"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const data_source_1 = require("../database/data-source");
const dataSource = new typeorm_1.DataSource(data_source_1.dataSourceOptions);
async function connect() {
    try {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
        await dataSource.initialize();
        console.log('Data Source has been initialized!');
    }
    catch (err) {
        console.error('Error during Data Source connect', err);
    }
}
async function disconnect() {
    try {
        await dataSource.destroy();
        console.log('Data Source disconnected!');
    }
    catch (err) {
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
//# sourceMappingURL=main.seed.js.map