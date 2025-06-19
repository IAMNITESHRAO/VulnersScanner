"use client";

import PageContainer from "@/app/components/container/PageContainer";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "@/app/components/forms/theme-elements/CustomSelect";
import useUserDetails from "@/app/hooks/useUserDetails";
import { getAssetProfileListAPI, getHeatmapFrameworks, getScanListAPI, reScanAllAPI } from "@/axios/apis"; 1
import { Box, Button, CircularProgress, Grid, MenuItem, Typography } from "@mui/material";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";
import Link from "next/link";
import toast from "react-hot-toast";
import TopCardsServices from "./TopCardsServices";
import TopTabs from "./TopTabs";
import Tabs from "./Tabs";
import ServiceTabs from "./Tabs";

export default function Scan() {
    const { CLIENT_ID, loading } = useUserDetails();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Extract query parameters
    const defaultCloudCategory = searchParams.get("cloudCategory");
    const defaultAsset = searchParams.get("asset");

    // States
    const [assetOptions, setAssetOptions] = useState([]);
    const [scanOptions, setScanOptions] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(defaultAsset);
    const [cloudCategory, setCloudCategory] = useState(defaultCloudCategory);
    const [selectedScan, setSelectedScan] = useState("");
    const [heatmapData, setHeatmapData] = useState(null);
    const [shouldFetchHeatmap, setShouldFetchHeatmap] = useState(true); // ✅ Controls when heatmap API is called



    // CLick And Data change when status switch
    const [selectedStatus, setSelectedStatus] = useState(null); // Holds the selected TopCard status

    // Function to handle TopCard click
    const handleTopCardClick = (status) => {
        setSelectedStatus(status === "All" ? null : status);  // Reset if "All" is clicked
    };


    const countBy = (g) =>
        heatmapData ? heatmapData.filter((d) => d.group === g).length : 0;

    const filteredHeatmap = useMemo(() => {
        if (!heatmapData) return [];
        if (!selectedStatus || selectedStatus === "All") return heatmapData;  // Show all if no specific status is selected
        return heatmapData.filter((d) => d.group === selectedStatus);  // Filter based on selected status
    }, [heatmapData, selectedStatus]);



    // Fetch Assets
    const getAsset = async (CLIENT_ID, cloudType) => {
        try {
            const response = await getAssetProfileListAPI(CLIENT_ID, cloudType.toLowerCase());
            if (response.status === 200) {
                const assets = response.data;
                setAssetOptions(assets);

                if (assets.length > 0) {
                    const initialAsset = defaultAsset ? defaultAsset : assets[0].profileName;
                    setSelectedAsset(initialAsset);
                    getScan(CLIENT_ID, initialAsset);
                } else {
                    setSelectedAsset("");
                    setScanOptions([]);
                    setSelectedScan("");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // Fetch Scan List
    const getScan = async (CLIENT_ID, assetProfile) => {
        try {
            const response = await getScanListAPI(CLIENT_ID, assetProfile);
            if (response.status === 200) {
                let scans = response.data;

                if (scans.length > 0) {
                    // ✅ Sort scans by latest entryDate first
                    scans.sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));

                    setScanOptions(scans); // ✅ Store sorted scan list
                    setSelectedScan(scans[0].id); // ✅ Select the latest scan automatically
                } else {
                    setScanOptions([]);
                    setSelectedScan("");
                }
            }
        } catch (error) {
            console.error(error.message);
            setScanOptions([]);
            setSelectedScan("");
        }
    };


    // Fetch Heatmap Data
    const [loadingHeatmap, setLoadingHeatmap] = useState(false);
    const fetchHeatmapData = async (id) => {
        setLoadingHeatmap(true);
        try {
            const response = await getHeatmapFrameworks(id);

            if (response.status === 200) {
                console.log(response.data.frameworks)
                const normalized = response.data.frameworks.map((item) => {

                    if (item.frameworkType === "cloudType") {
                        return { ...item, group: "CLOUDTYPE" };
                    }
                    if (item.frameworkType === "SecurityHub") {
                        return { ...item, group: "SECURITYHUB" };
                    }
                    if (item.frameworkType === "categories") {
                        return { ...item, group: "SERVICES" };
                    }
                    if (item.frameworkType === "yml") {
                        return { ...item, group: "YML" };
                    }
                    return { ...item, group: "COMPLIANCE" };
                });

                setHeatmapData(normalized);
            } else {
                setHeatmapData([]);
            }
        } catch (err) {
            console.error(err);
            setHeatmapData([]);
        } finally {
            setLoadingHeatmap(false);
        }
    };


    useEffect(() => {
        if (!loading && CLIENT_ID) {
            getAsset(CLIENT_ID, cloudCategory);
        }
    }, [CLIENT_ID, loading]);

    useEffect(() => {
        if (selectedScan && shouldFetchHeatmap) {
            fetchHeatmapData(selectedScan);
            setShouldFetchHeatmap(false); // ✅ Prevents further auto-calls
        }
    }, [selectedScan, shouldFetchHeatmap]);


    // Handle Cloud Category Change
    const handleCloudCategoryChange = async (event) => {
        const selectedCategory = event.target.value;
        setCloudCategory(selectedCategory);
        setHeatmapData(null); // Clear the previous heatmap data while loading the new one
        setShouldFetchHeatmap(false); // ✅ Prevents automatic heatmap API calls
        try {
            const response = await getAssetProfileListAPI(CLIENT_ID, selectedCategory.toLowerCase());
            if (response.status === 200) {
                const assets = response.data;
                setAssetOptions(assets);

                if (assets.length > 0) {
                    const initialAsset = assets[0].profileName; // Automatically select the first asset
                    setSelectedAsset(initialAsset);
                    const scanResponse = await getScanListAPI(CLIENT_ID, initialAsset); // Fetch scans for the first asset
                    if (scanResponse.status === 200) {
                        setScanOptions(scanResponse.data);
                        const firstScanId = scanResponse.data.length > 0 ? scanResponse.data[0].id : "";
                        setSelectedScan(firstScanId);
                        // if (firstScanId) {
                        //     fetchHeatmapData(firstScanId);
                        // }
                    }
                } else {
                    setSelectedAsset("");
                    setScanOptions([]);
                    setSelectedScan("");
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };


    // Handle Asset Change
    const handleAssetChange = async (event) => {
        const selectedAsset = event.target.value;
        setSelectedAsset(selectedAsset);
        setHeatmapData(null); // Clear previous heatmap data
        setShouldFetchHeatmap(false); // ✅ Prevents automatic heatmap API calls

        if (selectedAsset) {
            try {
                const scanResponse = await getScanListAPI(CLIENT_ID, selectedAsset);
                if (scanResponse.status === 200) {
                    const scans = scanResponse.data;
                    setScanOptions(scans);

                    if (scans.length > 0) {
                        const firstScanId = scans[0].id;
                        setSelectedScan(firstScanId);
                        // fetchHeatmapData(firstScanId);
                    } else {
                        setSelectedScan("");
                        setHeatmapData([]); // No scans, clear heatmap
                    }
                }
            } catch (error) {
                console.error(error.message);
                setScanOptions([]);
                setSelectedScan("");
                setHeatmapData([]);
            }
        }
    };

    // Handle Scan Change
    const handleScanChange = (event) => {
        const selectedScanId = event.target.value;
        setSelectedScan(selectedScanId);
        setHeatmapData(null); // Clear previous heatmap data
        setShouldFetchHeatmap(false); // ✅ Prevents automatic heatmap API calls
        // if (selectedScanId) {
        //     fetchHeatmapData(selectedScanId);
        // }
    };

    const searchScanResult = () => {
        setShouldFetchHeatmap(true); // ✅ Allows heatmap API call
        fetchHeatmapData(selectedScan);
    }

    // All Rescan
    const [isRescanning, setIsRescanning] = useState(false);
    const handleRescan = async () => {
        if (!selectedScan) {
            toast.error("Please select a scan before rescanning.");
            return;
        }

        setIsRescanning(true); // Start loading

        try {
            const rescanData = { sid: selectedScan };
            const response = await reScanAllAPI(rescanData);

            if (response.status === 201) {
                toast.success(response.data);
                fetchHeatmapData(selectedScan);
            } else {
                toast.error("Failed to initiate rescan.");
            }
        } catch (error) {
            toast.error("An error occurred while initiating the rescan.");
        } finally {
            setIsRescanning(false);
        }
    };


    return (
        <>
            <PageContainer title="Scan" description="this is scan">
                <Grid container spacing={2} mb={1}>
                    <Grid item xs={12} sm={1}>
                        <CustomFormLabel htmlFor="rescan" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            Rescan
                        </CustomFormLabel>
                        {isRescanning ? (
                            <CircularProgress size={18} sx={{ margin: "0.5rem" }} />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontSize: ".7rem",
                                    padding: ".5rem",
                                    lineHeight: "1",
                                    borderRadius: "4px",
                                    marginRight: 1,
                                    marginBottom: ".5rem",
                                    backgroundColor: '#1976d2',
                                    color: '#ffffff', // text white
                                    '& .MuiButton-startIcon': {
                                        color: '#ff784e', // icon orange in normal state
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ff784e', // orange bg on hover
                                        color: '#ffffff',           // text blue on hover
                                        '& .MuiButton-startIcon': {
                                            color: '#1976d2',         // icon white on hover
                                        },
                                    },
                                }}
                                onClick={handleRescan}
                            >
                                Rescan
                            </Button>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <CustomFormLabel htmlFor="cloudCategory" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            Select Cloud Category
                        </CustomFormLabel>
                        <CustomSelect
                            labelId="cloudCategory-label"
                            id="cloudCategory"
                            value={cloudCategory}
                            onChange={handleCloudCategoryChange}
                            fullWidth
                        >
                            <MenuItem value={"aws"} sx={{ fontSize: ".7rem" }}>
                                AWS
                            </MenuItem>
                            <MenuItem value={"azure"} sx={{ fontSize: ".7rem" }}>
                                Azure
                            </MenuItem>
                            <MenuItem value={"gcp"} sx={{ fontSize: ".7rem" }}>
                                GCP
                            </MenuItem>
                        </CustomSelect>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <CustomFormLabel htmlFor="asset" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            Asset
                        </CustomFormLabel>
                        <CustomSelect
                            labelId="asset-label"
                            id="asset"
                            value={selectedAsset}
                            onChange={handleAssetChange}
                            fullWidth
                        >
                            {assetOptions.length > 0 ? (
                                assetOptions.map((asset) => (
                                    <MenuItem key={asset.id} value={asset.profileName} sx={{ fontSize: ".7rem" }}>
                                        {asset.profileName}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled value="" sx={{ fontSize: ".7rem" }}>
                                    No Assets Available
                                </MenuItem>
                            )}
                        </CustomSelect>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <CustomFormLabel htmlFor="scan" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            Scan
                        </CustomFormLabel>
                        <CustomSelect
                            labelId="scan-label"
                            id="scan"
                            value={selectedScan}
                            onChange={handleScanChange}
                            fullWidth
                        >
                            {scanOptions.length > 0 ? (
                                // ✅ Sort by latest date first
                                [...scanOptions]
                                    .sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate))
                                    .map((scan) => (
                                        <MenuItem key={scan.id} value={scan.id} sx={{ fontSize: ".7rem" }}>
                                            {moment(scan.entryDate).format("YYYY-MM-DD HH:mm:ss")}
                                        </MenuItem>
                                    ))
                            ) : (
                                <MenuItem disabled value="" sx={{ fontSize: ".7rem" }}>
                                    No Scans Available
                                </MenuItem>
                            )}
                        </CustomSelect>
                    </Grid>

                    <Grid item xs={12} sm={1}>
                        <CustomFormLabel htmlFor="rescan" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            &nbsp;
                        </CustomFormLabel>
                            <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                fontSize: ".7rem",
                                padding: ".5rem",
                                lineHeight: "1",
                                borderRadius: "4px",
                                marginRight: 1,
                                marginBottom: ".5rem",
                                backgroundColor: '#1976d2',
                                color: '#ffffff', // text white
                                '& .MuiButton-startIcon': {
                                    color: '#ff784e', // icon orange in normal state
                                },
                                '&:hover': {
                                    backgroundColor: '#ff784e', // orange bg on hover
                                    color: '#ffffff',           // text blue on hover
                                    '& .MuiButton-startIcon': {
                                        color: '#1976d2',         // icon white on hover
                                    },
                                },
                            }}
                            onClick={searchScanResult}
                        >
                            Search
                        </Button>
                    </Grid>

                </Grid>

                <Box mt={2} mb={2}>
                    <Grid size={{ xs: 12, lg: 12 }}>
                        {/* <ServiceTabs/> */}
                        <ServiceTabs
                            statusDataWidgets={{
                                total: heatmapData ? heatmapData.length : 0,
                                securityhub: countBy("SECURITYHUB"),
                                categories: countBy("SERVICES"),
                                cloudType: countBy("CLOUDTYPE"),
                                compliance: countBy("COMPLIANCE"),
                                yml: countBy("YML")
                            }}
                            onCardClick={handleTopCardClick}
                        />
                    </Grid>
                </Box>

                <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                    {loadingHeatmap ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                        </Box>
                    ) : filteredHeatmap.length ? (
                        filteredHeatmap.map((data, index) => {
                            const selectedScanDetails = scanOptions.find(scan => scan.id === selectedScan);
                            const scanEntryDate = selectedScanDetails ? moment(selectedScanDetails.entryDate).format("YYYY-MM-DD HH:mm:ss") : "";

                            const reportUrl = `/dashboard/cloud-scan/reports?cloudCategory=${cloudCategory}&asset=${selectedAsset}&scan=${selectedScan}&scanEntryDate=${encodeURIComponent(scanEntryDate)}&framework=${data.frameworkName}&frameworkType=${data.frameworkType}`;

                            return (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Link href={reportUrl} passHref style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                        <StatusCard
                                            title={data.frameworkName}
                                            passed={data.compliantFC}
                                            failed={data.nonCompliantFC}
                                        />
                                    </Link>
                                </Grid>
                            );
                        })
                    ) : (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                            <Typography>No Data Available</Typography>
                        </Box>
                    )}
                </Grid>

            </PageContainer>
        </>
    );
}