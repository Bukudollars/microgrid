import React from 'react'
import { Modal } from '@mui/material';
import { Box, Button, Stack  } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSimulationDispatch } from '../../contexts/SimulationContext';
import { useCurrentIndexDispatch } from '../../contexts/SimulationContext';

const SaveSettingsModal = ({open, setOpen, variables}) => {

    const navigate = useNavigate();
    const { startSimulation } = useSimulationDispatch();
    const setCurrentIndex = useCurrentIndexDispatch();

    const handleYes = (event) => {
        navigate("/simulation")
        setOpen(false)
        setCurrentIndex(0)
        startSimulation(variables)
    }

    const handleNo = (event) => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Settings Saved Successfully
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Would you like to rerun simulations with the new settings?
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleYes}>
                            Yes
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleNo}>
                            No
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default SaveSettingsModal