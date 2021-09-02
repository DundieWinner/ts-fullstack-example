import React, { useState } from 'react';
import styles from './EmptyShoppingListCard.module.scss';
import Card from '../../atoms/Card';
import { Flex, FlexDirection, Grid } from '@mipke/pyramid';
import { Button } from '@material-ui/core';
import AddUpdateShoppingListItemDrawer from '../AddUpdateShoppingListItemDrawer';

interface EmptyShoppingListCardProps {
  onFirstItemCreated: () => void;
}

const EmptyShoppingListCard = ({ onFirstItemCreated }: EmptyShoppingListCardProps) => {
  const [createFirstItemDrawerOpen, setCreateFirstItemDrawerOpen] = useState(false);

  return (
    <>
      <Card className={styles.emptyCard}>
        <Grid style={{ placeItems: 'center' }}>
          <Flex direction={FlexDirection.COLUMN}>
            <p>Your shopping list is empty :(</p>
            <Button variant={'contained'} color={'primary'} onClick={() => setCreateFirstItemDrawerOpen(true)}>
              Add your first item
            </Button>
          </Flex>
        </Grid>
      </Card>
      {createFirstItemDrawerOpen && (
        <AddUpdateShoppingListItemDrawer item={null} onItemPersisted={onFirstItemCreated} onCloseDialog={() => setCreateFirstItemDrawerOpen(false)} />
      )}
    </>
  );
};

export default EmptyShoppingListCard;
