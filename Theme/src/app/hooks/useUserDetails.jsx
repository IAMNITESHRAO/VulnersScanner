import { getLoggedInUserAPI } from '@/axios/apis';
import { useState, useEffect } from 'react';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getLoggedInUserAPI();
        setUserDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const CLIENT_ID = userDetails?.clientCompanyId || null; 
  return { CLIENT_ID, userDetails, loading, error };
};

export default useUserDetails;