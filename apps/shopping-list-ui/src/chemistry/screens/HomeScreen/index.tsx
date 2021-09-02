import React, { useCallback } from 'react';
import styles from './HomeScreen.module.scss';
import { CircularProgress } from '@material-ui/core';
import { Flex, JustifyContent, Stack } from '@mipke/pyramid';
import { useGetShoppingList } from '../../../services/ShoppingListService';
import { useMount } from '../../../app/hooks/useMount';
import ShoppingList from '../../molecules/ShoppingList';
import EmptyShoppingListCard from '../../molecules/EmptyShoppingListCard';

const HomeScreen = () => {
  const { execute: doGetShoppingList, loading: loadingShoppingList, data: shoppingList } = useGetShoppingList();
  useMount(() => {
    doGetShoppingList();
  });
  const onItemUpdated = useCallback(() => {
    doGetShoppingList();
  }, [doGetShoppingList]);

  return (
    <div className={styles.s}>
      {shoppingList == null && loadingShoppingList ? (
        <Flex justifyContent={JustifyContent.CENTER} style={{ marginTop: '4rem' }}>
          <CircularProgress size={75} />
        </Flex>
      ) : shoppingList != null && shoppingList.length === 0 ? (
        <EmptyShoppingListCard onFirstItemCreated={onItemUpdated} />
      ) : shoppingList != null && shoppingList.length > 0 ? (
        <Stack style={{ marginTop: '3rem' }}>
          <ShoppingList items={shoppingList} onItemUpdated={onItemUpdated} />
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomeScreen;

/*

 */
