// import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Select, MenuItem } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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

function SelecExercise(props) {
  const context = useContext(props.context);
  const timer = useContext(props.contextTimer);

  const handleChange = (event) => {
    context.setExercise(event.target.value);
    timer.setTimer("resetPenalization");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Select
        value={context.exercise}
        onChange={handleChange}
        displayEmpty
        mode="dark"
        className="select-exercise"
      >
        <MenuItem value={3} className="exercise">
          Check the King 1
        </MenuItem>
        <MenuItem value={4} className="exercise">
          Check the King 2
        </MenuItem>
        <MenuItem value={5} className="exercise">
          Check the King 3
        </MenuItem>
        <MenuItem value={0} className="exercise">
          Full Route 1
        </MenuItem>
        <MenuItem value={1} className="exercise">
          Full Route 2
        </MenuItem>
        <MenuItem value={2} className="exercise">
          Full Route 3
        </MenuItem>
      </Select>
    </ThemeProvider>
  );
}

export default SelecExercise;
