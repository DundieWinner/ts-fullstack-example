import React, { useState } from 'react';
import styles from './ShoppingList.module.scss';
import { ShoppingListItem as Model } from '../../../services/ShoppingListService';
import { Flex, JustifyContent, Stack } from '@mipke/pyramid';
import ShoppingListItem from '../ShoppingListItem';
import { Button } from '@material-ui/core';
import AddUpdateShoppingListItemDrawer from '../AddUpdateShoppingListItemDrawer';

interface ShoppingListProps {
  items: Model[];
  onItemUpdated: () => void;
}

const ShoppingList = ({ items, onItemUpdated }: ShoppingListProps) => {
  const [createNewItemDrawerOpen, setCreateNewItemDrawerOpen] = useState(false);

  return (
    <>
      <Stack className={styles.l}>
        <Flex justifyContent={JustifyContent.SPACE_BETWEEN}>
          <h2>Your Items</h2>
          <Button variant={'contained'} color={'primary'} onClick={() => setCreateNewItemDrawerOpen(true)}>
            Add Item
          </Button>
        </Flex>
        {items.map((i) => (
          <ShoppingListItem key={i.id} item={i} onItemUpdated={onItemUpdated} />
        ))}
      </Stack>
      {createNewItemDrawerOpen && (
        <AddUpdateShoppingListItemDrawer
          item={null}
          onItemPersisted={() => {
            onItemUpdated();
            setCreateNewItemDrawerOpen(false);
          }}
          onCloseDialog={() => setCreateNewItemDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default ShoppingList;
