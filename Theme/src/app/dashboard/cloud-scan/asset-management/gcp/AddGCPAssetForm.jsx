// import React, { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
// import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

// export default function AddGCPAssetForm({ addAssetModal, toggleAddAssetModal }) {
//     const [formData, setFormData] = useState({
//         json: "",
//         remark: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     return (
//         <Dialog open={addAssetModal} onClose={toggleAddAssetModal} fullWidth={'sm'}>
//             <DialogTitle>Add GCP Asset</DialogTitle>
//             <form>
//                 <DialogContent sx={{ paddingTop: '0', paddingBottom: '0' }}>
//                     <Grid container spacing={3} mb={3}>
//                         <Grid item xs={12} sm={6}>
//                             <CustomTextField
//                                 margin="dense"
//                                 name="json"
//                                 label="JSON"
//                                 fullWidth
//                                 value={formData.json}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <CustomTextField
//                                 margin="dense"
//                                 name="remark"
//                                 label="Remark"
//                                 fullWidth
//                                 value={formData.remark}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         onClick={toggleAddAssetModal}
//                         sx={{
//                             backgroundColor: '#ffe1d6',     // light orange
//                             color: '#ff784e',              // orange text
//                             '&:hover': {
//                                 backgroundColor: '#ff784e',  // dark orange on hover
//                                 color: '#ffffff',            // white text
//                             },
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         color="primary"
//                         sx={{
//                             backgroundColor: 'primary', // ensures base color
//                             '&:hover': {
//                                 backgroundColor: '#1976d2', // locks hover color
//                             },
//                         }}
//                     >
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
//     );
// }


import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { addCloudProfileAPI } from "@/axios/apis"; // import your API function
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddGCPAssetForm({ addAssetModal, toggleAddAssetModal }) {
    const [formData, setFormData] = useState({
        json: "",
        remark: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormValid = () => {
        const { json, remark } = formData;
        return json && remark;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            const payload = {
                cloudType: "gcp",
                json: formData.json,
                remark: formData.remark,
            };

            const response = await addCloudProfileAPI(payload);

            if (response.status === 201) {
                toast.success("GCP asset added successfully.");
                toggleAddAssetModal();
                setFormData({ json: "", remark: "" });
                router.push("/dashboard/cloud-scan/asset-management"); // adjust if needed
            } else {
                toast.error(response.data || "Failed to add GCP asset.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Dialog open={addAssetModal} onClose={toggleAddAssetModal} fullWidth={'sm'}>
            <DialogTitle>Add GCP Asset</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Grid container spacing={3} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                name="json"
                                label="JSON"
                                fullWidth
                                value={formData.json}
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
