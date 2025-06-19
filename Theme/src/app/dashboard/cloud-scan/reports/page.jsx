'use client';

import PageContainer from '@/app/components/container/PageContainer';
import AdvanceTable from '@/app/components/dhanushComponents/AdvanceTable';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import useUserDetails from '@/app/hooks/useUserDetails';
import { getAssetProfileListAPI, getCommandResultAPI, getHeatmapFrameworks, getScanFrameworkAPI, getScanListAPI, reScanCommandsAPI, reScanFrameworkAPI } from "@/axios/apis";
import { Box, Button, Card, Chip, CircularProgress, Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { IconEye, IconX } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import moment from "moment";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { utils as XLSXUtils, writeFile as XLSXWriteFile } from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Parser } from "json2csv";
import Logo from '../../layout/shared/logo/Logo';
import { IconExclamationCircle } from '@tabler/icons-react';
import TopCards from '@/app/components/dashboards/modern/TopCards';

export default function Reports() {
    const { CLIENT_ID, loading } = useUserDetails();

    const searchParams = useSearchParams();

    // Fetch query parameters from URL
    const cloudCategoryParam = searchParams.get("cloudCategory");
    const assetParam = searchParams.get("asset");
    const defaultAsset = searchParams.get("asset");
    const scanParam = searchParams.get("scan");
    const frameworkParam = searchParams.get("framework");
    const frameworkTypeParam = searchParams.get("frameworkType");

    // States for dynamic select values
    const [assetOptions, setAssetOptions] = useState([]);
    const [scanOptions, setScanOptions] = useState([]);
    const [cloudCategory, setCloudCategory] = useState(cloudCategoryParam);
    const [selectedAsset, setSelectedAsset] = useState(assetParam);
    const [selectedScan, setSelectedScan] = useState(scanParam);
    const [selectedFramework, setSelectedFramework] = useState(frameworkParam);
    const [frameworkOptions, setFrameworkOptions] = useState([]);
    const [loadingFrameworks, setLoadingFrameworks] = useState(false);
    const [heatmapData, setHeatmapData] = useState(null);

    const [frameworkType, setFrameworkType] = useState('');

    // Drawer for view details of scanned framework
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Function to handle opening the drawer
    const [scanId, setScanId] = useState();
    const [scanCommandResultDetails, setScanCommandResultDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Loading state for the drawer

    const handleView = async (DATA) => {
        setSelectedRow(DATA);
        setDrawerOpen(true);
        setIsLoading(true); // Start loading before API call

        try {
            const response = await getCommandResultAPI(scanId, DATA.csrId);
            if (response.status === 200) {
                setScanCommandResultDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Stop loading after API call
        }
    };

    // Function to close the drawer
    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedRow(null); // Clear data
    };

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

    // Handle Cloud Category Change
    const handleCloudCategoryChange = async (event) => {
        const selectedCategory = event.target.value;
        setCloudCategory(selectedCategory);
        setHeatmapData(null);

        setSelectedAsset("")
        setSelectedScan("")
        setSelectedFramework("")
        setScanFrameworkReport([]);

        try {
            const response = await getAssetProfileListAPI(CLIENT_ID, selectedCategory.toLowerCase());
            if (response.status === 200) {
                const assets = response.data;
                setAssetOptions(assets);


                if (assets.length > 0) {
                    const initialAsset = assets[0].profileName;
                    setSelectedAsset(initialAsset);

                    // Fetch new scan list based on new asset
                    const scanResponse = await getScanListAPI(CLIENT_ID, initialAsset);
                    if (scanResponse.status === 200) {
                        const scans = scanResponse.data;
                        setScanOptions(scans);
                        const firstScanId = scans.length > 0 ? scans[0].id : "";
                        setSelectedScan(firstScanId);
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


    // Fetch Heatmap Data
    const [loadingHeatmap, setLoadingHeatmap] = useState(false);
    const fetchHeatmapData = async (id) => {
        setLoadingHeatmap(true); // Start loading
        try {
            const response = await getHeatmapFrameworks(id);
            if (response.status === 200) {
                setHeatmapData(response.data);
            } else {
                setHeatmapData([]); // Set empty array if no data
            }
        } catch (error) {
            console.error(error.message);
            setHeatmapData([]); // Set empty array in case of error
        } finally {
            setLoadingHeatmap(false); // Stop loading
        }
    };


    // Handle Asset Change
    const handleAssetChange = async (event) => {
        const selectedAsset = event.target.value;
        setSelectedAsset(selectedAsset);
        setFrameworkOptions([]);

        if (selectedAsset) {
            try {
                const scanResponse = await getScanListAPI(CLIENT_ID, selectedAsset);
                if (scanResponse.status === 200) {
                    const scans = scanResponse.data;
                    setScanOptions(scans);

                    if (scans.length > 0) {
                        const firstScanId = scans[0].id;
                        setSelectedScan(firstScanId);

                        // ✅ Reset scanFrameworkReport when scan is changed
                        setScanFrameworkReport([]);

                        fetchHeatmapData(firstScanId);
                    } else {
                        setSelectedScan("");
                        setScanFrameworkReport([]); // ✅ Clear framework report if no scans
                    }
                }
            } catch (error) {
                console.error(error.message);
                setScanOptions([]);
                setSelectedScan("");
                setScanFrameworkReport([]); // ✅ Clear framework report in case of error
            }
        }
    };


    // Handle Scan Change
    const handleScanChange = (event) => {
        const selectedScanId = event.target.value;
        setSelectedScan(selectedScanId);
        if (selectedScanId) {
            getScanFramework(selectedScanId, frameworkParam);
            fetchHeatmapData(selectedScanId);
        }
    };

    // Fetch heatmap frameworks dynamically
    useEffect(() => {
        if (selectedScan) {
            fetchHeatmapFrameworks(selectedScan);
        }
    }, [selectedScan]);

    useEffect(() => {
        if (!loading && CLIENT_ID) {
            getAsset(CLIENT_ID, cloudCategory);
        }
    }, [CLIENT_ID, loading]);

    const fetchHeatmapFrameworks = async (scanId) => {
        setLoadingFrameworks(true);
        try {
            const response = await getHeatmapFrameworks(scanId);
            if (response.status === 200) {
                const frameworks = response.data.frameworks;
                setFrameworkOptions(frameworks);

                // ✅ If a framework is already selected, find and set its frameworkType
                if (selectedFramework) {
                    const selectedFrameworkData = frameworks.find(fw => fw.frameworkName === selectedFramework);
                    if (selectedFrameworkData) {
                        setFrameworkType(selectedFrameworkData.frameworkType); // ✅ Set frameworkType dynamically
                    }
                }
            } else {
                setFrameworkOptions([]);
                setFrameworkType(""); // ✅ Reset if no frameworks found
            }
        } catch (error) {
            console.error(error.message);
            setFrameworkOptions([]);
            setFrameworkType(""); // ✅ Reset in case of error
        } finally {
            setLoadingFrameworks(false);
        }
    };


    // Get Scaned Data
    const [statusDataWidgets, setStatusDataWidgets] = useState([]);
    const [scanFrameworkReport, setScanFrameworkReport] = useState([]);
    const [shouldFetchFrameworkReport, setShouldFetchFrameworkReport] = useState(true);
    const cleanText = (text) => {
        if (!text) return "";
        return text
            .replace(/�/g, '"')
            .replace(/“|”/g, '"')
            .replace(/‘|’/g, "'")
            .replace(/\uFFFD/g, '"')
            .trim();
    };

    const getScanFramework = async (scanParam, frameworkTypeParam, frameworkParam) => {
        try {
            const response = await getScanFrameworkAPI(scanParam, frameworkTypeParam, frameworkParam);

            if (response.status === 200) {
                // ✅ Convert API response text to UTF-8
                const buffer = new TextEncoder().encode(JSON.stringify(response.data.scanFrameworkReport));
                const decodedText = new TextDecoder("utf-8").decode(buffer);
                const parsedData = JSON.parse(decodedText);

                const cleanedData = parsedData.map(item => ({
                    ...item,
                    description: cleanText(item.description),
                }));

                setStatusDataWidgets(response.data.ptAll);
                setScanFrameworkReport(cleanedData);
                setScanId(response.data.scan.id);
            }
        } catch (error) {
            console.log("Error in getScanFramework:", error.message);
        }
    };



    // Get Scaned Data Table
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        if (scanFrameworkReport.length > 0) {
            const transformedData = scanFrameworkReport.map(report => ({
                certificationIndex: report.index,
                description: report.description,
                resourceID: report.resourceID,
                complianceStatus: report.complianceStatus,
                command: report.command,
                csrId: report.csrId,
            }));
            setTableData(transformedData);
        } else {
            setTableData([]); // If no data, keep empty
        }
    }, [scanFrameworkReport]);


    const columnHelper = createColumnHelper();

    const columns = [

        columnHelper.accessor('certificationIndex', {
            header: () => 'Index',
            cell: info => {
                const value = info.getValue();
                const formattedValue = value.split('$')[0]; // ✅ Extract only part before `$`
                return (
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                        {formattedValue}
                    </Typography>
                );
            },
        }),
        columnHelper.accessor('description', {
            header: () => 'Description',
            cell: info => {
                const value = info.getValue();
                return (
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{
                            fontSize: '0.75rem',
                            maxWidth: '600px',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }}
                    >
                        {value}
                    </Typography>
                );
            },
        }),
        columnHelper.accessor('resourceID', {
            header: () => 'Resource',
            cell: info => {
                const value = info.getValue();
                return (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                        {value}
                    </Typography>
                )
            }
        }),
        columnHelper.accessor('complianceStatus', {
            header: () => 'Status',
            meta: {
                filterVariant: 'select',
            },
            cell: info => (
                <Chip
                    size='small'
                    sx={{
                        fontSize: '.6rem',
                        bgcolor: (theme) => {
                            switch (info.getValue()) {
                                case 'COMPLIANT':
                                    return theme.palette.success.light;
                                case 'PENDING':
                                    return '#FFFF8F';
                                case 'NOT_APPLICABLE':
                                    return theme.palette.info.light;
                                case 'ERROR':
                                    return theme.palette.warning.light;
                                case 'NON_COMPLIANT':
                                    return theme.palette.error.light;
                                default:
                                    return theme.palette.secondary.light;
                            }
                        },
                        color: (theme) => {
                            switch (info.getValue()) {
                                case 'COMPLIANT':
                                    return theme.palette.success.main;
                                case 'PENDING':
                                    return '#FFBF00';
                                case 'NOT_APPLICABLE':
                                    return theme.palette.info.main;
                                case 'ERROR':
                                    return theme.palette.warning.main;
                                case 'NON_COMPLIANT':
                                    return theme.palette.error.dark;
                                default:
                                    return theme.palette.secondary.main;
                            }
                        },
                        borderRadius: '2px',
                    }}
                    label={
                        info.getValue() === 'COMPLIANT' ? 'Compliant' :
                            info.getValue() === 'PENDING' ? 'Pending' :
                                info.getValue() === 'NOT_APPLICABLE' ? 'Not Applicable' :
                                    info.getValue() === 'ERROR' ? 'Error' :
                                        info.getValue() === 'NON_COMPLIANT' ? 'Non Compliant' :
                                            info.getValue()
                    } />
            ),
        }),
        {
            id: 'actions',
            header: () => 'Actions',
            cell: info => (
                <Box display="flex" justifyContent={'space-between'} gap={1}>
                    {isReTesting ? (
                        <CircularProgress size={16} />
                    ) : (
                        <Button
                            variant="outlined"
                            color="warning"
                            size="small"
                            sx={{ fontSize: '.7rem', padding: '.1rem 0.3rem', textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                            onClick={() => handleReTest(info.row.original)}
                        >
                            <IconRefresh size={14} /> Re-Test
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ fontSize: '.7rem', padding: '.1rem 0.3rem', textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', }}
                        onClick={() => handleView(info.row.original)}
                    >
                        <IconEye size={14} /> View
                    </Button>
                </Box>
            ),
        },
    ];

    // CLick And Data change when status switch
    const [selectedStatus, setSelectedStatus] = useState(null); // Holds the selected TopCard status

    // Function to handle TopCard click
    const handleTopCardClick = (status) => {
        setSelectedStatus(status === "All" ? null : status); // Reset if "All" is clicked
    };

    // Filter the tableData based on selectedStatus
    const filteredTableData = selectedStatus
        ? tableData.filter(item => item.complianceStatus === selectedStatus.toUpperCase())
        : tableData; // Show all if no status selected


    const [isFrameworkLoading, setIsFrameworkLoading] = useState(false); // ✅ New loading state

    const searchScanResult = async () => {
        if (!selectedScan) {
            toast.error("Please select a scan before searching.");
            return;
        }

        setIsFrameworkLoading(true); // ✅ Start loading before fetching data

        try {
            console.log(selectedScan, frameworkType, selectedFramework)
            await getScanFramework(selectedScan, frameworkType, selectedFramework);
        } finally {
            setIsFrameworkLoading(false); // ✅ Stop loading after API call is completed
        }
    };


    useEffect(() => {
        if (selectedScan && shouldFetchFrameworkReport) {
            getScanFramework(selectedScan, frameworkTypeParam, selectedFramework);
            setShouldFetchFrameworkReport(false);
        }
    }, [selectedScan, shouldFetchFrameworkReport]);

    const [isFrameworkRescanning, setIsFrameworkRescanning] = useState(false);
    // const handleRescanFramework = async () => {
    //     if (!selectedScan) {
    //         toast.error("Please select a scan before rescanning.");
    //         return;
    //     }

    //     setIsFrameworkRescanning(true); // Start loading

    //     try {
    //         // Define the payload for the API request
    //         const rescanData = {
    //             sid: selectedScan, // Scan ID
    //             frameworkType: frameworkTypeParam, // Framework Type
    //             framework: selectedFramework // Framework Name
    //         };

    //         // Call the API
    //         const response = await reScanFrameworkAPI(rescanData);

    //         // Handle success response
    //         if (response.status === 201) {
    //             toast.success(response.data);
    //         } else {
    //             toast.error("Failed to initiate framework rescan.");
    //         }
    //     } catch (error) {
    //         console.error("Framework Rescan Error:", error.message);
    //         toast.error("An error occurred while initiating the framework rescan.");
    //     } finally {
    //         setIsFrameworkRescanning(false); // Stop loading
    //     }
    // };

    const handleRescanFramework = async () => {
        if (!selectedScan) {
            toast.error("Please select a scan before rescanning.");
            return;
        }
    
        setIsFrameworkRescanning(true); // Start loading
    
        try {
            // ✅ Reset the framework report before starting the rescan
            setScanFrameworkReport([]); // Clears existing data and triggers re-render
    
            // Define the payload for the API request
            const rescanData = {
                sid: selectedScan, // Scan ID
                frameworkType: frameworkType, // Framework Type
                framework: selectedFramework // Framework Name
            };
    
            // Call the API
            console.log(rescanData)
            const response = await reScanFrameworkAPI(rescanData);
    
            // Handle success response
            if (response.status === 201) {
                toast.success(response.data);
    
                // ✅ Trigger new framework data fetch after rescan
                await getScanFramework(selectedScan, frameworkType, selectedFramework);
    
                setTimeout(async () => {
                    await getScanFramework(selectedScan, frameworkType, selectedFramework);
    
                    if (statusDataWidgets.pending !== 0) {  // ✅ Check if pending is NOT 0 before proceeding
                        setTimeout(async () => {
                            console.log(statusDataWidgets.pending);
                            console.log(selectedScan, frameworkType, selectedFramework)
                            await getScanFramework(selectedScan, frameworkType, selectedFramework);
    
                            if (statusDataWidgets.pending !== 0) {  // ✅ Check again before last call
                                setTimeout(async () => {
                                    await getScanFramework(selectedScan, frameworkType, selectedFramework);
                                }, 10000);
                            }
                        }, 10000);
                    }
                }, 10000);
            } else {
                toast.error("Failed to initiate framework rescan.");
            }
        } catch (error) {
            console.error("Framework Rescan Error:", error.message);
            toast.error("An error occurred while initiating the framework rescan.");
        } finally {
            setIsFrameworkRescanning(false); // Stop loading
        }
    };
    

    const [isReTesting, setIsReTesting] = useState(false);
    const handleReTest = async (data) => {
        if (!selectedScan) {
            toast.error("Please select a scan before re-testing.");
            return;
        }

        // Set loading state for this specific row
        setIsReTesting(true);

        try {
            // Define the payload for the API request
            const rescanData = {
                sid: selectedScan, // Scan ID
                cloudCommands: [data.command], // Commands array (modify as needed)
            };

            // Call the API
            const response = await reScanCommandsAPI(rescanData);

            // Handle success response
            if (response.status === 201) {
                toast.success(response.data);

                await getScanFramework(selectedScan, frameworkType, selectedFramework);

                setTimeout(async () => {
                    await getScanFramework(selectedScan, frameworkType, selectedFramework);

                    if (statusDataWidgets.pending !== 0) {  // ✅ Check if pending is NOT 0 before proceeding
                        setTimeout(async () => {
                            console.log(statusDataWidgets.pending);
                            await getScanFramework(selectedScan, frameworkType, selectedFramework);

                            if (statusDataWidgets.pending !== 0) {  // ✅ Check again before last call
                                setTimeout(async () => {
                                    await getScanFramework(selectedScan, frameworkType, selectedFramework);
                                }, 10000);
                            }
                        }, 10000);
                    }
                }, 10000);
            } else {
                toast.error("Failed to initiate re-test.");
            }

        } catch (error) {
            console.error("Re-Test Error:", error.message);
            toast.error("An error occurred while initiating the re-test.");
        } finally {
            // Remove loading state for this row
            setIsReTesting(false);
        }
    };


    // Function to export as CSV
    const exportToCSV = () => {
        if (filteredTableData.length === 0) {
            toast.error("No data available for export.");
            return;
        }
        try {
            const fields = Object.keys(filteredTableData[0]); // Get column names
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(filteredTableData);

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Report.csv";
            link.click();
            toast.success("CSV file downloaded.");
        } catch (error) {
            console.error("CSV Export Error:", error);
            toast.error("Error exporting CSV.");
        }
    };

    // Function to export as Excel
    const exportToExcel = () => {
        if (filteredTableData.length === 0) {
            toast.error("No data available for export.");
            return;
        }
        try {
            const worksheet = XLSXUtils.json_to_sheet(filteredTableData);
            const workbook = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(workbook, worksheet, "Report");
            XLSXWriteFile(workbook, "Report.xlsx");
            toast.success("Excel file downloaded.");
        } catch (error) {
            console.error("Excel Export Error:", error);
            toast.error("Error exporting Excel.");
        }
    };

    // // Function to export as PDF
    // const exportToPDF = () => {
    //     if (filteredTableData.length === 0) {
    //         toast.error("No data available for export.");
    //         return;
    //     }
    //     try {
    //         const doc = new jsPDF({ orientation: "landscape" }); // Use landscape mode for more width

    //         // Set document title
    //         doc.text("Scan Report", 14, 10);

    //         // Define table columns
    //         const tableColumn = ["Index", "Description", "Resource", "Status"];
    //         const tableRows = filteredTableData.map(row => [
    //             row.certificationIndex,
    //             row.description,
    //             row.resourceID,
    //             row.complianceStatus
    //         ]);

    //         // Use autoTable to format the table
    //         autoTable(doc, {
    //             head: [tableColumn],
    //             body: tableRows,
    //             startY: 20,
    //             styles: { fontSize: 10 },
    //             headStyles: { fillColor: [22, 160, 133] }, // Custom header color
    //             margin: { top: 20 },
    //             columnStyles: {
    //                 1: { cellWidth: 150 },
    //                 2: { cellWidth: 50 },
    //                 3: { cellWidth: 50 }
    //             },
    //         });

    //         // Save the PDF
    //         doc.save("Report.pdf");
    //         toast.success("PDF file downloaded.");
    //     } catch (error) {
    //         console.error("PDF Export Error:", error);
    //         toast.error("Error exporting PDF.");
    //     }
    // };

//     const exportToPDF = () => {
//         if (filteredTableData.length === 0) {
//           toast.error("No data available for export.");
//           return;
//         }
      
//         try {
//           const doc = new jsPDF({ orientation: "landscape" });
      
//           // 1️⃣ Introductory Page
//           doc.setFontSize(22);
//           doc.text("CyberCube Services", 14, 20);
      
//           // Add cybersecurity image (ensure the image is in base64 format)
// //           const imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."; // dummy short image string
// //  // Replace with your base64 image data
// //  doc.addImage(imgData, 'PNG', 14, 30, 60, 60);
// //  // Adjust position and size as needed
      
//           // Add footer to the first page
//         //   const pageHeight = doc.internal.pageSize.height;
//         //   doc.setFontSize(10);
//         //   doc.text("Confidential", 14, pageHeight - 10);
      
//           // 2️⃣ Data Table Page
//           doc.addPage();
      
//           // Define table columns
//           const tableColumn = ["Index", "Description", "Resource", "Status"];
//           const tableRows = filteredTableData.map((row) => [
//             row.certificationIndex,
//             row.description,
//             row.resourceID,
//             row.complianceStatus,
//           ]);
      
//           autoTable(doc, {
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//             styles: { fontSize: 10 },
//             headStyles: { fillColor: [22, 160, 133] },
//             margin: { top: 20 },
//             columnStyles: {
//               1: { cellWidth: 150 },
//               2: { cellWidth: 50 },
//               3: { cellWidth: 50 },
//             },
//           });
      
//           // 3️⃣ Add footer and page numbers to all pages
//           const pageCount = doc.internal.getNumberOfPages();
//           for (let i = 1; i <= pageCount; i++) {
//             doc.setPage(i);
//             const pageHeight = doc.internal.pageSize.height;
//             doc.setFontSize(10);
//             doc.text("Confidential", 14, pageHeight - 10);
//             doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, pageHeight - 10);
//           }
      
//           // Save the PDF
//           doc.save("Report.pdf");
//           toast.success("PDF file downloaded.");
//         } catch (error) {
//           console.error("PDF Export Error:", error);
//           toast.error("Error exporting PDF.");
//         }
//       };

const exportToPDF = async () => {
    if (filteredTableData.length === 0) {
      toast.error("No data available for export.");
      return;
    }
  
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297], // A4
        compress: true
      });
  
      // Load your logo as base64
      const imgData = await getBase64FromImageUrl("/images/logos/dark-logo.png");
  
      // === FRONT PAGE ===
      const pageWidth = doc.internal.pageSize.getWidth();
  
      const logoWidth = 70;
      const logoHeight = 20;
      const logoX = (pageWidth - logoWidth) / 2;
  
      doc.addImage(imgData, "PNG", logoX, 20, logoWidth, logoHeight); // Centered horizontally
  
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Dhanush Guard Scan Report", pageWidth / 2, 80, { align: "center" });
  
      doc.setFontSize(14);
      doc.setTextColor(150);
      doc.setFont("helvetica", "normal");
      doc.text("scan-results", pageWidth / 2, 90, { align: "center" });

      const scanInfo = [
        ["Report Downloaded at:", filteredTableData[0]?.scanDateTime || new Date().toLocaleString()],
        ["Compliance:", "API not found"],
        ["Scan type:", "API not found"],
    ];

    let y = 130;
        scanInfo.forEach(([label, value]) => {
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0);
            doc.text(label, 50, y);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(70);
            doc.text(value, 110, y);
            y += 10;
        });

  
      // === TABLE PAGE ===
      doc.addPage("landscape");
  
      const tableColumn = ["Index", "Description", "Resource", "Status"];
      const tableRows = filteredTableData.map(row => [
        row.certificationIndex,
        row.description,
        row.resourceID,
        String(row.complianceStatus) // Ensure status is a string
      ]);
  
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        didParseCell: function (data) {
          if (data.section === 'body' && data.column.index === 3) { // complianceStatus column
            const status = data.cell.raw;
                    let textColor = '#000000';
                    let icon = null;

                    switch (status) {
                        case 'COMPLIANT':
                            textColor = '#2e7d32';
                            break;
                        case 'PENDING':
                            textColor = '#FFBF00';
                            break;
                        case 'NOT_APPLICABLE':
                            textColor = '#0288d1';
                            break;
                        case 'ERROR':
                            textColor = '#f57c00';
                            break;
                        case 'NON_COMPLIANT':
                            textColor = '#c62828';
                            break;
                        default:
                            textColor = '#757575';
                            break;
                    }
      
            // data.cell.styles.fillColor = bgColor;
            data.cell.styles.textColor = textColor;
          }
        }
      });      
  
      // Page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, pageHeight - 10);
      }
  
      doc.save("Report.pdf");
      toast.success("PDF file downloaded.");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Error exporting PDF.");
    }
  };
  
  const getBase64FromImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };
  






// const exportToPDF = async () => {
//     if (filteredTableData.length === 0) {
//       toast.error("No data available for export.");
//       return;
//     }
  
//     try {
//         const doc = new jsPDF({ 
//             orientation: "portrait", 
//             unit: "mm", 
//             format: [210, 247], 
//             compress: true 
//           });
          
  
//       // Load your image as base64
//       const imgData = await getBase64FromImageUrl("/images/logos/Dhanushimgpdf1.png");
  
//       // Intro page with full background image
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
//       doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
  
//       // Second page for table
//       doc.addPage();
  
//       // Define columns
//       const tableColumn = ["Index", "Description", "Resource", "Status"];
//       const tableRows = filteredTableData.map((row) => [
//         row.certificationIndex,
//         row.description,
//         row.resourceID,
//         row.complianceStatus,
//       ]);
  
//       autoTable(doc, {
//         head: [tableColumn],
//         body: tableRows,
//         startY: 20,
//         styles: { fontSize: 10 },
//         headStyles: { fillColor: [22, 160, 133] },
//         didParseCell: function (data) {
//           if (data.section === 'body' && data.column.index === 3) { // complianceStatus column
//             const status = data.cell.raw;
      
//             // Define background and text colors
//             let bgColor = '#ffffff';
//             let textColor = '#000000';
      
//             switch (status) {
//               case 'COMPLIANT':
//                 bgColor = '#d0f0c0'; // success.light
//                 textColor = '#2e7d32'; // success.main
//                 break;
//               case 'PENDING':
//                 bgColor = '#FFFF8F';
//                 textColor = '#FFBF00';
//                 break;
//               case 'NOT_APPLICABLE':
//                 bgColor = '#b3e5fc'; // info.light
//                 textColor = '#0288d1'; // info.main
//                 break;
//               case 'ERROR':
//                 bgColor = '#ffe0b2'; // warning.light
//                 textColor = '#f57c00'; // warning.main
//                 break;
//               case 'NON_COMPLIANT':
//                 bgColor = '#ffcdd2'; // error.light
//                 textColor = '#c62828'; // error.dark
//                 break;
//               default:
//                 bgColor = '#e0e0e0'; // secondary.light
//                 textColor = '#757575'; // secondary.main
//             }
      
//             data.cell.styles.fillColor = bgColor;
//             data.cell.styles.textColor = textColor;
//           }
//         }
//       });      
  
//       // Page numbers
//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         const pageHeight = doc.internal.pageSize.height;
//         doc.setFontSize(10);
//         doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, pageHeight - 10);
//       }
  
//       doc.save("Report.pdf");
//       toast.success("PDF file downloaded.");
//     } catch (error) {
//       console.error("PDF Export Error:", error);
//       toast.error("Error exporting PDF.");
//     }
//   };
  
//   // 🖼️ Helper function to convert image file to base64
//   const getBase64FromImageUrl = (url, maxWidth = 600, maxHeight = 800) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.setAttribute("crossOrigin", "anonymous");
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         let width = img.width;
//         let height = img.height;
  
//         // Maintain aspect ratio while resizing
//         if (width > maxWidth) {
//           height *= maxWidth / width;
//           width = maxWidth;
//         }
//         if (height > maxHeight) {
//           width *= maxHeight / height;
//           height = maxHeight;
//         }
  
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
  
//         ctx.drawImage(img, 0, 0, width, height);
//         const dataURL = canvas.toDataURL("image/jpeg", 1.5);
//         resolve(dataURL);
//       };
//       img.onerror = () => reject("Image load failed.");
//       img.src = url;
//     });
//   };


    return (
        <>
            <PageContainer title="Reports" description="this is reports">
                <Grid container spacing={1}>

                    <Grid item xs={12} sm={1}>
                        <CustomFormLabel htmlFor="rescan" sx={{ fontSize: '.8rem', marginTop: '.5rem' }}>
                            Rescan
                        </CustomFormLabel>

                        {isFrameworkRescanning ? (
                            <CircularProgress size={20} />
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
                                onClick={handleRescanFramework} // Call the function on click
                            >
                                Rescan
                            </Button>
                        )}
                    </Grid>


                    {/* Cloud Category Selection */}
                    <Grid item xs={12} sm={2}>
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

                    {/* Asset Selection */}
                    <Grid item xs={12} sm={2}>
                        <CustomFormLabel htmlFor="asset" sx={{ fontSize: '.8rem', marginTop: '.5rem' }}>Asset</CustomFormLabel>
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

                    {/* Scan Selection */}
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

                    {/* Security Framework (From Heatmap Options) */}
                    <Grid item xs={12} sm={3}>
                        <CustomFormLabel htmlFor="framework" sx={{ fontSize: '.8rem', marginTop: '.5rem' }}>Security Framework</CustomFormLabel>
                        <CustomSelect
                            id="framework"
                            value={selectedFramework}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setSelectedFramework(selectedValue);

                                // ✅ Find the corresponding frameworkType from frameworkOptions
                                const selectedFrameworkData = frameworkOptions.find(fw => fw.frameworkName === selectedValue);
                                if (selectedFrameworkData) {
                                    setFrameworkType(selectedFrameworkData.frameworkType); // ✅ Update frameworkType dynamically
                                } else {
                                    setFrameworkType(""); // ✅ Reset if not found
                                }
                            }}
                            fullWidth
                        >
                            {loadingFrameworks ? (
                                <MenuItem disabled sx={{ fontSize: '.7rem' }}>
                                    <CircularProgress size={20} />
                                </MenuItem>
                            ) : frameworkOptions.length > 0 ? (
                                frameworkOptions.map((framework) => (
                                    <MenuItem key={framework.frameworkName} value={framework.frameworkName} sx={{ fontSize: '.7rem' }}>
                                        {framework.frameworkName}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled sx={{ fontSize: '.7rem' }}>
                                    No Frameworks Available
                                </MenuItem>
                            )}
                        </CustomSelect>
                    </Grid>

                    <Grid item xs={12} sm={1}>
                        <CustomFormLabel htmlFor="rescan" sx={{ fontSize: ".8rem", marginTop: ".5rem" }}>
                            &nbsp;
                        </CustomFormLabel>
                        {
                            isFrameworkLoading ?
                                <Button
                                    variant="outlined"
                                    color="primary"
                                >
                                    <CircularProgress size={15} />
                                </Button> : <Button
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
                        }
                    </Grid>

                </Grid>

                <Box mt={2} mb={2}>
                    <Grid size={{ xs: 12, lg: 12 }}>
                        <TopCards statusDataWidgets={statusDataWidgets} onCardClick={handleTopCardClick} />
                    </Grid>
                </Box>

                <Card variant='outlined' sx={{ paddingTop: '0', paddingBottom: '0', }}>

                    <Box mt={2} mb={2} display={'flex'} alignItems={'center'} gap={1}>
                        <Button variant="contained" color="primary" onClick={exportToCSV} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px',backgroundColor: '#1976d2',
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
                                    }, }}>
                            Export CSV
                        </Button>
                        <Button variant="contained" color="primary" onClick={exportToExcel} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px',backgroundColor: '#1976d2',
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
                                    }, }}>
                            Export Excel
                        </Button>
                        <Button variant="contained" color="primary" onClick={exportToPDF} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px',backgroundColor: '#1976d2',
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
                                    }, }}>
                            Export PDF
                        </Button>
                    </Box>

                    {isFrameworkLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                            <CircularProgress size={40} /> {/* ✅ Show loading spinner when fetching */}
                        </Box>
                    ) : (
                        <AdvanceTable tableData={filteredTableData} columns={columns} />
                    )}
                </Card>


                {/* Drawer for Viewing Details */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleCloseDrawer}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 450,
                            padding: 2,
                        }
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedFramework}</Typography>
                        <IconButton onClick={handleCloseDrawer}>
                            <IconX />
                        </IconButton>
                    </Box>


                    <Box mt={2} p={2} sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                        {isLoading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                                <CircularProgress />
                            </Box>
                        ) : (
                            scanCommandResultDetails.commonCommands && scanCommandResultDetails.commonCommands.length > 0 ? (
                                scanCommandResultDetails.commonCommands.map((command, index) => (
                                    <Box key={index} mb={2} p={1}>
                                        <Typography variant="subtitle1" mb={2}><strong>ConfigRule:</strong> {command.command}</Typography>
                                        <Typography variant="subtitle1" mb={2}>
                                            <strong>Status:</strong>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    display: "inline-block",
                                                    fontSize: '.75rem',
                                                    fontWeight: 600,
                                                    padding: "4px 8px",
                                                    borderRadius: "4px",
                                                    ml: 1,
                                                    bgcolor: (theme) => {
                                                        switch (scanCommandResultDetails.status) {
                                                            case 'COMPLIANT':
                                                                return theme.palette.success.light;
                                                            case 'PENDING':
                                                                return '#FFFF8F';
                                                            case 'NOT_APPLICABLE':
                                                                return theme.palette.info.light;
                                                            case 'ERROR':
                                                                return theme.palette.warning.light;
                                                            case 'NON_COMPLIANT':
                                                                return theme.palette.error.light;
                                                            default:
                                                                return theme.palette.secondary.light;
                                                        }
                                                    },
                                                    color: (theme) => {
                                                        switch (scanCommandResultDetails.status) {
                                                            case 'COMPLIANT':
                                                                return theme.palette.success.main;
                                                            case 'PENDING':
                                                                return '#FFBF00';
                                                            case 'NOT_APPLICABLE':
                                                                return theme.palette.info.main;
                                                            case 'ERROR':
                                                                return theme.palette.warning.main;
                                                            case 'NON_COMPLIANT':
                                                                return theme.palette.error.dark;
                                                            default:
                                                                return theme.palette.secondary.main;
                                                        }
                                                    },
                                                }}
                                            >
                                                {scanCommandResultDetails.status}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="subtitle1" mb={2}><strong>Description:</strong> {command.description}</Typography>
                                        <Typography variant="subtitle1" mb={2}><strong>Output:</strong> {scanCommandResultDetails.resultText}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1" color="textSecondary">No data available</Typography>
                            )
                        )}
                    </Box>
                </Drawer>

            </PageContainer>
        </>
    );
}