import debugLib from "debug";
import app from './app.js';
import config from './config/index.js';

const debug = debugLib('book_management:server');

const PORT = config.PORT || 3001;

const startServer = async () => {
    app.listen(PORT, () => {
        debug(`Server listening on port number: ${PORT}`);
    }).on('error', (err) => {
        debug(err);
        process.exit(1);
    })
}

startServer();