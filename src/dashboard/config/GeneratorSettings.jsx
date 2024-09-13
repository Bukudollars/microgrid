import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

function GeneratorSettings() {
  const [generatorCount, setGeneratorCount] = React.useState(1);
  const handleChangeGenCount = (event) => {
    setGeneratorCount(event.target.value);
  }
  const [generatorSize, setGeneratorSize] = React.useState(400);
  const handleChangeGenSize = (event) => {
    setGeneratorSize(event.target.value);
  }
  return (
    <Box>
      <Typography variant="h5">Generator Settings</Typography>
      <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
        <InputLabel id="generator-count-label">Generator Count</InputLabel>
        <Select
          labelId="generator-count-label"
          id="generator-count"
          value={1}
          label="Generator Count"
          onChange={handleChangeGenCount}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
        <InputLabel id="generator-size-label">Generator Size</InputLabel>
        <Select
          labelId="generator-size-label"
          id="generator-size"
          value={400}
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
  );
}
export default GeneratorSettings;