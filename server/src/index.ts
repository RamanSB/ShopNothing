import cors from 'cors';
import bodyParser from 'body-parser';
import Server from './server';
import routes from './routes/routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const serverPort : number = 6942
const DB_NAME : string = "nothing";
let middlewares: Array<any> = [bodyParser.json(), cors({ origin: "http://localhost:3000", credentials: true }), cookieParser()];
let server : Server = new Server(serverPort, middlewares, [routes], "");
console.log(`Process Env: ${process.env.ENV}`);
server.connectToDatabase(process.env.ENV === 'development' ? process.env.DB_URL + DB_NAME : process.env.DB_URL);
server.listen();