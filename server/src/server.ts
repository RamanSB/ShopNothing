import express, { Application } from 'express';
import mongoose from 'mongoose';

class Server {

    public app : Application
    private port: number

    constructor(port: number, middleware: Array<any>, routers: Array<express.Router>,  apiPath: string) {
        this.port = port;
        this.app = express();
        this.middleware(middleware);
        this.setUpRoutes(routers);
    }

    middleware(middlewares : Array<any>) : void {
        for (let middleware of middlewares) {
            this.app.use(middleware);
        }
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`);
        })
    }

    setUpRoutes(routers : Array<express.Router>) {
        for (let router of routers) {
            this.app.use(router);
        }
    }

    async connectToDatabase(dbUrl: string): Promise<void> {
        await mongoose.connect(dbUrl, () => {
            console.log(`Successfully connected to Database: ${dbUrl}`);
        });
    }

    
}

export default Server;