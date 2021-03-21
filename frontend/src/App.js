import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header'
import theme from './components/ui/Theme'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
    </ThemeProvider>
  );
}

export default App;
