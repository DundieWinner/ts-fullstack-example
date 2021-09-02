import { Flex, JustifyContent, Stack } from '@mipke/pyramid';
import React, { useEffect, useState } from 'react';
import styles from './ShoppingListItem.module.scss';
import Card from '../../atoms/Card';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { ShoppingListItem as Model, useDeleteShoppingListItem, usePutUpdateShoppingListItem } from '../../../services/ShoppingListService';
import { MdDelete, MdEdit } from 'react-icons/all';
import classNames from 'classnames';
import AddUpdateShoppingListItemDrawer from '../AddUpdateShoppingListItemDrawer';

interface ShoppingListItemProps {
  item: Model;
  onItemUpdated: () => void;
}

const ShoppingListItem = ({ item, onItemUpdated }: ShoppingListItemProps) => {
  const [isChecked, setIsChecked] = useState(item.purchased);
  useEffect(() => {
    setIsChecked(item.purchased);
  }, [item]);
  const { execute: doDeleteItem, loading: deletingItem } = useDeleteShoppingListItem(item.id);
  const { execute: doMarkPurchased, loading: markingPurchased } = usePutUpdateShoppingListItem(item.id);
  const [editItemDrawerOpen, setEditItemDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Card
        className={classNames(styles.i, {
          [styles.selected]: isChecked,
        })}
      >
        <Flex justifyContent={JustifyContent.SPACE_BETWEEN}>
          <Flex>
            <Checkbox
              disabled={markingPurchased}
              color={'primary'}
              checked={isChecked}
              onChange={(event) => {
                setIsChecked(event.target.checked);
                doMarkPurchased({
                  ...item,
                  purchased: !item.purchased,
                }).then(() => {
                  onItemUpdated();
                });
              }}
            />
            <Stack>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </Stack>
          </Flex>
          <Flex className={styles.actions}>
            <IconButton disabled={markingPurchased} onClick={() => setEditItemDrawerOpen(true)}>
              <MdEdit />
            </IconButton>
            <IconButton disabled={markingPurchased} onClick={() => setDeleteModalOpen(true)}>
              <MdDelete />
            </IconButton>
          </Flex>
        </Flex>
      </Card>
      <Dialog
        className={styles.dialog}
        open={deleteModalOpen}
        disableBackdropClick={deletingItem}
        disableEscapeKeyDown={deletingItem}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>Are you sure you want to delete this item? This can not be undone.</DialogContent>
        <DialogActions>
          <Button disabled={deletingItem} onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={deletingItem}
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              doDeleteItem().then(() => {
                onItemUpdated();
              });
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {editItemDrawerOpen && (
        <AddUpdateShoppingListItemDrawer
          item={item}
          onItemPersisted={() => {
            onItemUpdated();
            setEditItemDrawerOpen(false);
          }}
          onCloseDialog={() => setEditItemDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default ShoppingListItem;
