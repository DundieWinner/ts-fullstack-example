import * as express from 'express';
import * as shoppingListController from './app/shopping-list-items/controller';

const app = express();
app.use(express.json());

shoppingListController.registerEndpoints(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
