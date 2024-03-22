import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getAccessToken } from './spotifyAuth'; // Import access token retrieval function

const CallbackComponent = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        // Retrieve the access token using the code
        const accessToken = await getAccessToken("60e38dde15b847ddb34db989a19e4c97", code); // Update with your client ID

        // Do something with the access token (e.g., store it in local storage)
        console.log('Access token:', accessToken); // Example (replace with storage logic)

        // Redirect to a different route after successful authentication
        history.push('/'); // Redirect to the home page
      } catch (error) {
        console.error('Error handling callback:', error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    handleCallback();
  }, [location.search, history]);

  return (
    <div>
      <p>Handling callback...</p>
      {/* You can render a loading indicator here if needed */}
    </div>
  );
};

export default CallbackComponent;
