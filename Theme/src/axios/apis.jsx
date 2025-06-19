import { commonRequest } from "./config";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

// ✅ LOGIN API
export const loginAPI = async (data) => {
    return await commonRequest("POST", `${AUTH_URL}/auth/login`, data);
};

// ✅ VERIFY OTP API
export const verifyOtpAPI = async (data) => {
    return await commonRequest("POST", `${AUTH_URL}/auth/verify-otp`, data);
};

// Existing APIs
export const getAssetListAPI = async (CLIENT_ID) => {
    return commonRequest("GET", `${BASE_URL}/cloud-profile/get-profile-list/${CLIENT_ID}`);
};

export const getLoggedInUserAPI = async () => {
    return await commonRequest("GET", `${AUTH_URL}/user/get-user`);
};

export const addCloudProfileAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/cloud-profile/add-profile`, data);
};

export const editCloudProfileAPI = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/cloud-profile/edit-profile`, data);
};

export const deleteCloudProfileAPI = async (ID) => {
    return await commonRequest("DELETE", `${BASE_URL}/cloud-profile/delete-profile/${ID}`);
};

export const getAssetProfileListAPI = async (CLIENT_ID, cloudType) => {
    return await commonRequest("GET", `${BASE_URL}/cloud-profile/get-profile-list/${CLIENT_ID}/${cloudType}`);
};

export const getScanListAPI = async (CLIENT_ID, cloudProfile) => {
    return await commonRequest("GET", `${BASE_URL}/scan/get-scan-list/${CLIENT_ID}/${cloudProfile}`);
};

export const getHeatmapFrameworks = async (ID) => {
    return await commonRequest("GET", `${BASE_URL}/scan/get-scan2/${ID}`);
};

export const getFrameworksListAPI = async () => {
    return await commonRequest("GET", `${BASE_URL}/frameworks/frameworks-list`);
};

export const getScanFrameworkAPI = async (ID, frameworkType, framework) => {
    return await commonRequest("GET", `${BASE_URL}/scan/get-scan-framework2/${ID}/${frameworkType}/${framework}`);
};

export const getCommandResultAPI = async (SCAN_ID, CSRID) => {
    return await commonRequest("GET", `${BASE_URL}/csr/get-command-result/${SCAN_ID}/${CSRID}`);
};

export const addScanAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/scan/add-scan`, data);
};

export const reScanAllAPI = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/scan/re-scan-all`, data);
};

export const reScanFrameworkAPI = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/scan/re-scan-framework`, data);
};

export const reScanCommandsAPI = async (data) => {
    return await commonRequest("PUT", `${BASE_URL}/scan/re-scan-commands`, data);
};

export const addScanCategoriesAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/scan/add-scan-categories`, data);
};

export const commonCommandsCategoriesAPI = async () => {
    return await commonRequest("GET", `${BASE_URL}/common-commands/get-common-command-categories`);
};


// SNYK APIS 


// export const downloadSnykReportAPI = async (id) => {
//     return await commonRequest("GET", `${BASE_URL}/snyk/downloadReportById/${id}`);
// };

export const snykScanZipFileAPI = async (data, format) => {
    return await commonRequest("POST", `${BASE_URL}/snyk/upload?format=${format}`, data, {
        "Content-Type": "multipart/form-data"
    });
};

export const getSnykScanResultAPI = async () => {
    try {
    const response = await commonRequest("GET", `${BASE_URL}/snyk/fetch_snykScans`);
    console.log("Profile Details Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

// export const deleteSnykReportAPI = async (id) => {
//     return await commonRequest("DELETE", `${BASE_URL}/snyk/delete-snyk-report/${id}`);
// };

export const deleteAllSnykReportAPI = async (ids) => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  //   DELETE /snyk/semgrep/delete-bulk   body: [1,2,3]
  return await commonRequest(
    'DELETE',
    `${BASE_URL}/snyk/delete-bulk`,
    idArray                         // body
  );
};




// semgrep

// export const semgrepScanZipFileAPI = async (data, format, scanType) => {
//   return await commonRequest("POST", `${BASE_URL}/semgrep/upload-scan?format=${format}&scanType=${scanType}`, data, {
//         "Content-Type": "multipart/form-data"
//     });
// };

export const semgrepScanZipFileAPI = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/semgrep/upload-scan`, data, {
    "Content-Type": "multipart/form-data",
  });
};

export const getSemgrepScanResultAPI = async () => {
    try {
    const response = await commonRequest("GET", `${BASE_URL}/semgrep/all-scans`);
    console.log("Profile Details Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

// export const deleteSemgrepReportAPI = async (id) => {
//     return await commonRequest("DELETE", `${BASE_URL}/semgrep/delete-report/${id}`);
// };

export const deleteAllSemgrepReportAPI = async (ids) => {
  const idArray = Array.isArray(ids) ? ids : [ids];
  //   DELETE /snyk/semgrep/delete-bulk   body: [1,2,3]
  return await commonRequest(
    'DELETE',
    `${BASE_URL}/semgrep/delete-bulk`,
    idArray                         // body
  );
};


// nMap APIS

export const addScanProfileAPI = async (data) => {
  console.log("Sending data to API:", data); // ✅ DEBUG THIS
  return await commonRequest("POST", `${BASE_URL}/scan/create`, data);
};

export const getProfileListAPI = async () => {
    return await commonRequest("GET", `${BASE_URL}/dashboard/profiles-overview`);
};

export const reScanProfileAPI = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/scan/rescan?profile=${data.profileName}`);
};

export const getProfileDetailsAPI = async (profileName) => {
  try {
    const response = await commonRequest("GET", `${BASE_URL}/dashboard/profile/${profileName}`);
    console.log("Profile Details Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

export const deleteScanProfileAPI = async (profileName) => {
    return await commonRequest("DELETE", `${BASE_URL}/dashboard/profile-orphan/${profileName}`);
};

