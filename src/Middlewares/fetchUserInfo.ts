import axios from 'axios';

interface UserData {
    id: string;
    display_name: string;
    email: string;
    // Add other properties you want to fetch
}

export const fetchUserData = async (accessToken: string): Promise<UserData> => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data as UserData;
    } catch (error) {
        // Handle any error that may occur during the API request
        throw new Error('An error occurred while fetching current user data from Spotify.');
    }
};
