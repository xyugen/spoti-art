# SpotiArt - Personalized Spotify Embedded Music Visuals

## Description
SpotiArt enables users to create personalized Spotify music embeds for their favorite tracks. With seamless integration with the Spotify API, the tool fetches real-time data about the user's currently playing track and generates an embed code that can be easily added to websites, blogs, or social media platforms.

## Installation
To run **SpotiArt** on your local machine, follow these steps:

1. Clone the GitHub repository:
```sh
$ git clone https://github.com/your-username/SpotiArt.git
```

2. Install the dependencies:
```sh
$ cd SpotiArt
$ npm install
```

3. Create a MongoDB database and collection:
- Ensure you have MongoDB installed and running locally.
- Create a new database and name it as per your preference.
- Inside the database, create a collection named "user_info" to store user-related data.

4. Obtain Spotify API Credentials:
- Go to the [Spotify Developer Dashboard website](https://developer.spotify.com/dashboard/).
- Create a new Spotify app and obtain the Client ID and Client Secret.
- Update the `.env-template` file with your credentials and rename it to `.env`.

The `.env` variables:
```sh
CLIENT_ID=<your_spotify_app_client_id>
CLIENT_SECRET=<your_spotify_app_client_secret>
URL=<your_website_url>
PORT=<your_website_port>
DEBUG=true

MONGODB_USERNAME=<mongodb_username>
MONGODB_PASSWORD=<mongodb_password>
MONGODB_DBNAME=<mongodb_database_name>
```

## Endpoints
SpotiArt provides the following endpoints for users:

- `/auth`: Authorizes the user to access Spotify and obtain necessary permissions.
- `/callback`: Callback endpoint for `/auth`.
- `/currently-playing`: Returns JSON data for the user's currently playing track. Use their key/username as a query parameter.
- `/embed/currently-playing`: Renders an embedded page that displays the user's currently playing Spotify song with mesmerizing visuals.
- `/token`: This endpoint allows users to obtain a new access token. Note that it requires the client ID and client secret as query parameters. However, it is not meant for regular users and should be accessed by developers for token management.

## Running the App
To start the application, use the following command in the terminal:
```sh
$ npm run dev
```

Please note that SpotiArt is still under development, and some features may be subject to changes and improvements.

## License
Licensed under the [GPL-3.0 license](LICENSE).

## Acknowledgments
Special thanks to the Spotify API team for providing access to their incredible platform.

*Note:*
SpotiArt is a work in progress, I am still continuously enhancing its functionalities and user experience.
