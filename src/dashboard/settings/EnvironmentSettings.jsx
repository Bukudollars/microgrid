import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';


function EnvironmentSettings() {
    const [cloudingFactor, setCloudingFactor] = React.useState(0);
    const handleCloudingFactorChange = (event, newValue) => {
        setCloudingFactor(newValue);
    };
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding: 2}}>
                    <Typography variant="h5">Environment Settings</Typography>
                    <Typography variant="body1">Clouding Factor: {cloudingFactor}</Typography>
                    <Slider aria-label="Clouding Factor" value ={cloudingFactor} onChange={handleCloudingFactorChange} />  
            </Box>
        //</Paper>
    );
}

export default EnvironmentSettings;