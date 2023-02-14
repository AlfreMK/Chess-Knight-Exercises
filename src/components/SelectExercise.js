import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
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



const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    max-width: 300px;
    margin-bottom: 50px;
    @media (max-width: 640px) { 
        order: 5;
      }
`;

const Title = styled.h3`
    text-align: center;
`;

const Highlighted = styled.span`
    color: #4183c4;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    width: fit-content;
`;