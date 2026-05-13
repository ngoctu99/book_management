import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import debugLib from 'debug';
import knex from '../../database/knexfile.js';


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

const models = files.reduce(async (modelObj, fileName) => {
    const initModel = await import(fileName);
    const model = initModel(knex);

    if (model) {
        modelObj[model.name] = model;
    }

    return modelObj;
}, {})

export default models;