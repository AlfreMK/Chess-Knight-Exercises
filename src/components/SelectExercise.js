// import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Select, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      // change text color
        text: {
            primary: "#cdcdcd",
            secondary: "#cdcdcd",
        },
        // change background color
        background: {
            default: "#262421",
            paper: "#262421",

        },
    },
  });

function SelecExercise(props){
    const context = useContext(props.context);
    
    const handleChange = (event) => {
        context.setExercise(event.target.value);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Select
                value={context.exercise}
                onChange={handleChange}
                displayEmpty
                mode="dark"
                className='select-exercise'

                >
                <MenuItem value={0}>
                    Main Exercise
                </MenuItem>
                <MenuItem value={1}>Exercise 1</MenuItem>
                <MenuItem value={2}>Exercise 2</MenuItem>
                <MenuItem value={3}>Exercise 3</MenuItem>
            </Select>
        </ThemeProvider>
    )
}

export default SelecExercise;

