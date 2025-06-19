"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import toast from "react-hot-toast";
import { addScanProfileAPI } from "@/axios/apis";


export default function AddScanProfileForm({ addProfileModal, toggleAddProfileModal, onAddProfile }) {
  const [formData, setFormData] = useState({
    profile: "",
    scanType: "",
    target: "",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    const { profile, scanType, target } = formData;
    return profile && scanType && target;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await addScanProfileAPI(formData);

      if (response?.success) {
        toast.success("Scan profile created successfully.");
        onAddProfile(response.data); 
        toggleAddProfileModal();
        setFormData({
          profile: "",
          scanType: "",
          target: "",
        });
      } else {
        toast.error(response?.message || "Failed to create profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog
      open={addProfileModal}
      onClose={toggleAddProfileModal}
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          paddingX: 2,
          paddingY: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.1rem", fontWeight: 600 }}>Create Scan Profile</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ paddingY: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                size="small"
                name="profile"
                label="Scan Profile"
                fullWidth
                value={formData.profile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                size="small"
                name="scanType"
                label="Scan Type"
                select
                fullWidth
                value={formData.scanType}
                onChange={handleChange}
              >
                {[
                  "Ping Scan", "Quick Scan", "Regular Scan", "Intense Scan",
                  "Quick Traceroute", "Intense udp", "All TCP Ports", "No Ping",
                  "Quick Plus", "Vulners"
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                size="small"
                name="target"
                label="Target (IP or Path)"
                fullWidth
                value={formData.target}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", paddingX: 2 }}>
          <Button
            onClick={toggleAddProfileModal}
            sx={{
              fontSize: "0.8rem",
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
            sx={{
              fontSize: "0.8rem",
              backgroundColor: '#1976d2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
