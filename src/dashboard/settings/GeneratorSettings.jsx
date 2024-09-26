import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import NumberInput from '../components/NumberInput';
//import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput' 
import PropTypes from 'prop-types';
import { useSettings, useSettingsDispatch } from '../../SettingsContext';

function GeneratorSettings() {
  const { generatorCount } = useSettings();
  const dispatch = useSettingsDispatch();
  const handleChangeGenCount = (event, value) => {
    console.log("Generator Count: ", value);
    dispatch({type: 'SET_GENERATOR_COUNT', payload: value});
  }
  const [generatorSize, setGeneratorSize] = React.useState(400);
  const handleChangeGenSize = (event) => {
    setGeneratorSize(event.target.value);
  }
  return (
    //<Paper elevation={4}>
      <Box sx={{textAlign: 'left', padding : 2}}>
        <Typography variant="h5">Generator Settings</Typography>
        <Typography variant="body1">Number of Generators: </Typography>
        <NumberInput min={0}
          aria-label="Number of Generators"
          placeholder="Number of Generators"
          value={generatorCount}
          onChange={handleChangeGenCount}
         />
        <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
          <InputLabel id="generator-size-label">Generator Size</InputLabel>
          <Select
            labelId="generator-size-label"
            id="generator-size"
            value={generatorSize}
            label="Generator Size"
            onChange={handleChangeGenSize}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={300}>300</MenuItem>
            <MenuItem value={400}>400</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1">Minimum Generator Set Load: 120 kW</Typography>
        <Typography variant="body1">Spinning Reserve Target: 280 kW</Typography>
      </Box>
    //</Paper>
  );
}

export default GeneratorSettings;