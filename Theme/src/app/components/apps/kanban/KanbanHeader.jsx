"use client";
import React, { useState, useContext } from 'react';
import { KanbanDataContext } from '@/app/context/kanbancontext/index';
import axios from '@/utils/axios';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Box,
    Grid2 as Grid,
} from "@mui/material";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../forms/theme-elements/CustomTextField";

function KanbanHeader() {
    const { addCategory, setError } = useContext(KanbanDataContext);
    const [show, setShow] = useState(false);
    const [listName, setListName] = useState('');

    // Closes the modal 
    const handleClose = () => setShow(false);
    // Opens the modal 
    const handleShow = () => setShow(true);

    // Handles adding a new category.
    const handleSave = async () => {
        try {
            const response = await axios.post('/api/TodoData/addCategory', { categoryName: listName });
            addCategory(response.data.name);
            setListName('');
            setShow(false);
        } catch (error) {
            setError(error.message);
        }
    };
    const isAddButtonDisabled = listName.trim().length === 0;

    return (<>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
            }}>
            <Typography variant="h5">Improving Work Processes</Typography>
            <Button variant="contained" onClick={handleShow}>
                Add List
            </Button>
        </Box>
        <Dialog
            open={show}
            onClose={handleClose}
            maxWidth="lg"
            sx={{ ".MuiDialog-paper": { width: "600px" } }}
        >
            <DialogTitle>Add List</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 12
                        }}>
                        <CustomFormLabel

                            htmlFor="default-value"
                        >
                            List Name
                        </CustomFormLabel>
                        <CustomTextField
                            autoFocus
                            id="default-value"
                            variant="outlined"
                            value={listName}
                            fullWidth
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} color="primary" disabled={isAddButtonDisabled}>
                    Add List
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default KanbanHeader;
