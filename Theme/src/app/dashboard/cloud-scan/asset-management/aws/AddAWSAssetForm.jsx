import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
} from "@mui/material";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { addCloudProfileAPI } from "@/axios/apis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // for Next.js 13+

export default function AddAWSAssetForm({ addAssetModal, toggleAddAssetModal }) {
    const [formData, setFormData] = useState({
        accessId: "",
        accessKey: "",
        region: "",
        remark: "",
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormValid = () => {
        const { accessId, accessKey, region, remark } = formData;
        return accessId && accessKey && region && remark;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            const payload = {
                cloudType: "aws",
                accessId: formData.accessId,
                accessKey: formData.accessKey,
                region: formData.region,
                remark: formData.remark,
            };

            const response = await addCloudProfileAPI(payload);

            if (response.status === 201) {
                toast.success("AWS asset added successfully.");
                toggleAddAssetModal();
                setFormData({
                    accessId: "",
                    accessKey: "",
                    region: "",
                    remark: "",
                });
                router.push("/dashboard/cloud-scan/asset-management"); // update this route as per your actual listing page
            } else {
                toast.error(response.data || "Failed to add asset.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Dialog open={addAssetModal} onClose={toggleAddAssetModal} fullWidth={'sm'}>
            <DialogTitle>Add AWS Asset</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Grid container spacing={3} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                name="accessId"
                                label="Access ID"
                                fullWidth
                                type="password"
                                value={formData.accessId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                name="accessKey"
                                label="Access Key"
                                fullWidth
                                type="password"
                                value={formData.accessKey}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                name="region"
                                label="Region"
                                fullWidth
                                value={formData.region}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                name="remark"
                                label="Remark"
                                fullWidth
                                value={formData.remark}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleAddAssetModal}
                        sx={{
                            backgroundColor: '#ffe1d6',
                            color: '#ff784e',
                            '&:hover': {
                                backgroundColor: '#ff784e',
                                color: '#ffffff',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        sx={{
                            backgroundColor: 'primary',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
