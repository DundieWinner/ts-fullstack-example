import { Flex, Grid, Stack } from '@mipke/pyramid';
import styles from './app.module.scss';
import HomeScreen from '../chemistry/screens/HomeScreen';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1871E8',
      dark: '#135aba',
      light: '#5e9cef',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Stack className={styles.s}>
      <Flex className={styles.header}>
        <h2>Shopping List</h2>
      </Flex>
      <Grid className={styles.content}>
        <HomeScreen />
      </Grid>
    </Stack>
  </ThemeProvider>
);

export default App;
