import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import debugLib from 'debug';

import knexLib from 'knex';
import knexConfig from '../../database/knexfile.js';

const knex = knexLib(knexConfig.development);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const debug = debugLib('book_management:modelIndex');

const getModelFiles = dir => 
    fs.readdirSync(dir)
        .filter( file => 
            (file.indexOf('.') !== -1) && 
            (file !== 'index.js')
        )
        .map( file => path.join(dir, file));

const files = getModelFiles(__dirname);

debug(files);

const models = {};

for (const file of files) {
    // using const module = await import(pathToFileURL(file).href); better
    const module = await import(pathToFileURL(file));

    const initModel = module.default;
    
    const model = initModel(knex);
    console.log("check model: ", model);
    if(model){
        models[model.name] = model;
    }
}
/* const models = files.reduce(async (modelObj, fileName) => {
    const initModel = await import(fileName);
    const model = initModel(knex);

    if (model) {
        modelObj[model.name] = model;
    }

    return modelObj;
}, {}) */

export default models;