import * as React from 'react';
import { Box, Typography, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
//import Paper from '@mui/material/Paper';
import NumberInput from '../components/NumberInput';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';
import { GENERATOR_SIZES } from '../../constants';

function GeneratorSettings({generatorCount, setGeneratorCount, generatorSize, setGeneratorSize}) {
  // const dispatch = useSettingsDispatch();
  // const handleChangeGenCount = (event, value) => {
  //   console.log("Generator Count: ", value);
  //   dispatch({type: 'SET_GENERATOR_COUNT', payload: value});
  // }

    const handleChangeGenCount = (event, value) => {
      setGeneratorCount(value)
    }

    const handleChangeGenSize = (event, value) => {
      const gen_count = parseInt(event.target.value, 10);
      setGeneratorSize(gen_count)
    }

  // const handleChangeGenSize = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (GENERATOR_SIZES.includes(value)) {
  //     console.log("Generator Size: ", value);
  //     dispatch({type: 'SET_GENERATOR_SIZE', payload: value});
  //   } else {
  //     console.error("Invalid generator size: ", value);
  //   }
  // }

  return (
    //<Paper elevation={4}>
      <Box sx={{
        textAlign: 'left', 
        padding : 2
        }}>
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
            {GENERATOR_SIZES.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
                </MenuItem>
            ))}
            
          </Select>
        </FormControl>
        <Typography variant="body1">Minimum Generator Set Load: {(generatorSize * 0.3).toFixed(0)} kW</Typography>
        <Typography variant="body1">Spinning Reserve Target: {(generatorSize * 0.7).toFixed(0)} kW</Typography>
        {/* 70-% of generator size */}
      </Box>
    //</Paper>
  );
}

export default GeneratorSettings;