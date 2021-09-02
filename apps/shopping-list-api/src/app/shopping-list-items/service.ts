const pgp = require('pg-promise')();
const db = pgp('postgres://user:password@localhost:5432/shoppinglist');

export const getShoppingList = () => db.any('select * from items order by id desc');

export const getItemById = (itemId: number) => db.one('select * from items where id = $1', itemId);

interface AddUpdateItemPayload {
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
}

export const insertItem = (payload: AddUpdateItemPayload) =>
  db.one(
    'insert into items(name, description, quantity, purchased) values(${name}, ${description}, ${quantity}, ${purchased}) returning id, name, description, quantity, purchased',
    payload,
  );

export const updateItemById = (itemId: number, payload: AddUpdateItemPayload) =>
  db.one('update items set name=$1, description=$2, quantity=$3, purchased=$4 where id=$5 returning id, name, description, quantity, purchased', [
    payload.name,
    payload.description,
    payload.quantity,
    payload.purchased,
    itemId,
  ]);

export const deleteItemById = (itemId: number) => db.result('delete from items where id = $1', itemId);
