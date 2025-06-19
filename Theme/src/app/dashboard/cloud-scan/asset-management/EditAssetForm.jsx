import React, { useEffect, useState } from "react";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, MenuItem, TextField } from '@mui/material';
import { addCloudProfileAPI, editCloudProfileAPI } from "@/axios/apis";
import toast from "react-hot-toast";

export default function EditAssetForm({ editAssetModal, toggleEditAssetModal, existingAssetData, onSuccess }) {
    const [formData, setFormData] = useState({
        remark: "",
        accessId: "",
        accessKey: "",
        region: "",
        subscriptionKey: "",
        json: "",
        status: "ACTIVE",
    });

    useEffect(() => {
        if (existingAssetData && Object.keys(existingAssetData).length > 0) {
            const { remark = "", serverCredentials = {}, status = "ACTIVE" } = existingAssetData;
            const cloudType = existingAssetData.cloudType ? existingAssetData.cloudType.toLowerCase() : "";

            const defaultData = {
                remark,
                status,
                accessId: serverCredentials.aws?.accessId || "",
                accessKey: serverCredentials.aws?.accessKey || "",
                region: serverCredentials.aws?.region || "",
                subscriptionKey: serverCredentials.azure?.subscriptionKey || "",
                json: serverCredentials.gcp?.json || "",
            };

            setFormData({ ...defaultData, cloudType });
        } else {
            setFormData({
                remark: "",
                accessId: "",
                accessKey: "",
                region: "",
                subscriptionKey: "",
                json: "",
                status: "ACTIVE",
                cloudType: "",
            });
        }
    }, [existingAssetData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { remark, status, cloudType } = formData;
            let filteredData = {id: existingAssetData.id, remark, status};

            if (cloudType === "aws") {
                filteredData = {
                    ...filteredData,
                    accessId: formData.accessId,
                    accessKey: formData.accessKey,
                    region: formData.region,
                };
            } else if (cloudType === "azure") {
                filteredData = {
                    ...filteredData,
                    subscriptionKey: formData.subscriptionKey,
                };
            } else if (cloudType === "gcp") {
                filteredData = {
                    ...filteredData,
                    json: formData.json,
                };
            }

            const response = await editCloudProfileAPI(filteredData);
            if (response.status === 200) {
                toast.success(response.data);
                toggleEditAssetModal();
                onSuccess();
            } else {
                toast.error(response.data);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update asset.");
        }
    };

    return (
        <Dialog open={editAssetModal} onClose={toggleEditAssetModal} fullWidth={'sm'}>
            <DialogTitle>Edit Asset</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ paddingTop: '0', paddingBottom: '0' }}>
                    <Grid container spacing={3} mb={3}>
                        {/* Status Field */}
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField
                                select
                                margin="dense"
                                id="status"
                                name="status"
                                label="Status"
                                fullWidth
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="ACTIVE">Active</MenuItem>
                                <MenuItem value="INACTIVE">Inactive</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Conditional Fields */}
                        {formData.cloudType === "aws" && (
                            <>
                                <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                                    <CustomTextField
                                        margin="dense"
                                        id="accessId"
                                        name="accessId"
                                        label="Access ID"
                                        type="text"
                                        autoComplete="off"
                                        fullWidth
                                        value={formData.accessId}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                                    <CustomTextField
                                        margin="dense"
                                        id="accessKey"
                                        name="accessKey"
                                        label="Access Key"
                                        type="text"
                                        autoComplete="off"
                                        fullWidth
                                        value={formData.accessKey}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                                    <CustomTextField
                                        margin="dense"
                                        id="region"
                                        name="region"
                                        label="Region"
                                        type="text"
                                        fullWidth
                                        value={formData.region}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )}

                        {formData.cloudType === "azure" && (
                            <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                                <CustomTextField
                                    margin="dense"
                                    id="subscriptionKey"
                                    name="subscriptionKey"
                                    label="Subscription Key"
                                    type="text"
                                    fullWidth
                                    value={formData.subscriptionKey}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}

                        {formData.cloudType === "gcp" && (
                            <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                                <CustomTextField
                                    margin="dense"
                                    id="json"
                                    name="json"
                                    label="JSON"
                                    type="text"
                                    fullWidth
                                    value={formData.json}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}

                        {/* Remark Field */}
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <CustomTextField
                                margin="dense"
                                id="remark"
                                name="remark"
                                label="Remark"
                                type="text"
                                fullWidth
                                value={formData.remark}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleEditAssetModal}
                    sx={{
                            backgroundColor: '#ffe1d6',
                            color: '#ff784e',
                            '&:hover': {
                                backgroundColor: '#ff784e',
                                color: '#ffffff',
                            },
                        }}>
                        Cancel
                    </Button>
                    <Button type="submit" color="primary"
                    sx={{
                            backgroundColor: 'primary',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}