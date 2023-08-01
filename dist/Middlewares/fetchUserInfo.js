import axios from 'axios';
export const fetchUserData = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error('An error occurred while fetching current user data from Spotify.');
    }
};
