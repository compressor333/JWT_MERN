import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Change the primary color
    },
    secondary: {
      main: '#ff5722', // Change the secondary color
    },
    // Add more palette options or customize other theme properties as needed
  }
});


export default function App() {


  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Navbar />
        <Content />
      </ThemeProvider>
    </>
  );
}
