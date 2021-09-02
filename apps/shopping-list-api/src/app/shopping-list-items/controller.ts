import * as yup from 'yup';
import { Express } from 'express';
import * as shoppingListItemService from './service';

export const registerEndpoints = (app: Express) => {
  app.get('/api/shopping-list', (req, res, next) => {
    shoppingListItemService
      .getShoppingList()
      .then(function (data) {
        res.status(200).json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  });

  const addUpdateItemSchema = yup.object().shape({
    name: yup.string().required().max(100),
    description: yup.string().required().max(500),
    quantity: yup.number().required(),
    purchased: yup.boolean().required(),
  });

  app.post('/api/shopping-list', async (req, res, next) => {
    await addUpdateItemSchema.validate(req.body).catch(function (err) {
      res.status(400).json({
        errors: err.errors,
      });
      return;
    });
    shoppingListItemService
      .insertItem(addUpdateItemSchema.cast(req.body))
      .then((d) => {
        res.status(200).json(d);
      })
      .catch(function (err) {
        return next(err);
      });
  });

  app.put('/api/shopping-list/:id', async (req, res, next) => {
    const itemId = parseInt(req.params.id);
    await shoppingListItemService.getItemById(itemId).catch(() => {
      res.status(404).send();
      return;
    });
    await addUpdateItemSchema.validate(req.body).catch(function (err) {
      res.status(400).json({
        errors: err.errors,
      });
      return;
    });
    shoppingListItemService
      .updateItemById(itemId, addUpdateItemSchema.cast(req.body))
      .then((d) => {
        res.status(200).json(d);
      })
      .catch(function (err) {
        return next(err);
      });
  });

  app.delete('/api/shopping-list/:id', async (req, res, next) => {
    const itemId = parseInt(req.params.id);
    await shoppingListItemService.getItemById(itemId).catch(() => {
      res.status(404).send();
      return;
    });
    shoppingListItemService
      .deleteItemById(itemId)
      .then(function () {
        res.status(204).send();
      })
      .catch(function (err) {
        return next(err);
      });
  });
};
