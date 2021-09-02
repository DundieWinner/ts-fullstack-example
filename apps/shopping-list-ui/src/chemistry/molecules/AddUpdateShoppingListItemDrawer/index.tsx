import React, { useEffect, useMemo, useState } from 'react';
import styles from './AddUpdateShoppingListItemDrawer.module.scss';
import { Button, Checkbox, Drawer, FormControl, FormControlLabel, InputLabel, Select, TextField } from '@material-ui/core';
import { ShoppingListItem, usePostNewShoppingListItem, usePutUpdateShoppingListItem } from '../../../services/ShoppingListService';
import { Flex, JustifyContent, Size, Spacer, Stack } from '@mipke/pyramid';

interface AddUpdateShoppingListItemDrawerProps {
  item: ShoppingListItem | null;
  onItemPersisted: () => void;
  onCloseDialog: () => void;
}

const AddUpdateShoppingListItemDrawer = ({ item, onCloseDialog, onItemPersisted }: AddUpdateShoppingListItemDrawerProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [purchased, setPurchased] = useState(false);
  useEffect(() => {
    if (item != null) {
      setName(item.name);
      setDescription(item.description);
      setQuantity(item.quantity);
      setPurchased(item.purchased);
    }
  }, [item]);
  const addOrEdit = useMemo(() => (item != null ? 'Edit' : 'Add'), [item]);

  const { execute: doCreateNewItem, loading: creatingNewItem } = usePostNewShoppingListItem();
  const { execute: doUpdateItem, loading: updatingItem } = usePutUpdateShoppingListItem(item?.id ?? -1);
  const inputsDisabled = creatingNewItem || updatingItem;
  const saveDisabled = name.length === 0 || description.length === 0;

  return (
    <Drawer anchor={'right'} open={true} onClose={onCloseDialog} disableEscapeKeyDown={inputsDisabled} disableBackdropClick={inputsDisabled}>
      <Stack className={styles.d}>
        <h3>{`${addOrEdit} An Item`}</h3>
        <Stack className={styles.inputs}>
          <p>{`${addOrEdit} your item below`}</p>
          <TextField label={'Item Name'} variant={'outlined'} value={name} onChange={(event) => setName(event.target.value)} />
          <TextField
            label={'Description'}
            multiline={true}
            maxRows={5}
            variant={'outlined'}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormControl variant={'outlined'}>
            <InputLabel htmlFor={'how-many'}>How many?</InputLabel>
            <Select
              native={true}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value as any)}
              label={'How many?'}
              inputProps={{
                name: 'how-many',
                id: 'how-many',
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </FormControl>
          {item != null && (
            <FormControlLabel
              control={<Checkbox checked={purchased} onChange={(event) => setPurchased(event.target.checked)} color={'primary'} />}
              label={'Purchased'}
            />
          )}
        </Stack>
        <Spacer size={Size.VERY_LARGE} />
        <Flex justifyContent={JustifyContent.END}>
          <Flex>
            <Button disabled={inputsDisabled} onClick={onCloseDialog}>
              Cancel
            </Button>
            {item != null ? (
              <Button
                disabled={inputsDisabled}
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                  doUpdateItem({
                    name,
                    description,
                    quantity,
                    purchased,
                  }).then(() => {
                    onItemPersisted();
                  });
                }}
              >
                Save Item
              </Button>
            ) : (
              <Button
                disabled={saveDisabled || inputsDisabled}
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                  doCreateNewItem({
                    name,
                    description,
                    quantity,
                    purchased,
                  }).then(() => {
                    onItemPersisted();
                  });
                }}
              >
                Add Task
              </Button>
            )}
          </Flex>
        </Flex>
      </Stack>
    </Drawer>
  );
};

export default AddUpdateShoppingListItemDrawer;
