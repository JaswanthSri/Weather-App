# WeatherFlow: Dynamic Weather Tracking 🌦️

WeatherFlow is a sleek and modern web application for dynamic weather tracking. With a clean, animated interface, it allows users to quickly view the current weather conditions and a 5-day forecast for major cities.

**Check out the live website here:** [https://weather-app-ten-brown-32.vercel.app/](https://weather-app-ten-brown-32.vercel.app/)

-----

## Features

  - **Search Functionality**: Easily search for weather by entering a city name.
  - **Dynamic Demo Data**: The app uses a set of hardcoded demo data to simulate an API call, providing a quick and consistent user experience without needing a real API key.
  - **Animated UI**: The interface includes a particle animation and smooth transitions to create a visually engaging experience.
  - **Current Weather Details**: Get key weather metrics like temperature, "feels like" temperature, humidity, wind speed, pressure, and visibility.
  - **5-Day Forecast**: View a simplified 5-day forecast with daily high and low temperatures and a weather icon.
  - **Responsive Design**: The app is fully responsive, ensuring a great experience on both desktop and mobile devices.

-----

## Technologies Used

  - **HTML5**: For the app's structure.
  - **CSS3**: For all styling, animations, and responsive design.
  - **JavaScript (ES6+)**: To handle user interactions, manage application logic, and dynamically render weather data.

-----

## How to Run Locally

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository**:
    ```bash
    git clone [repository_url]
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd [project_folder]
    ```
3.  **Open `index.html`**: Simply open the `index.html` file in your web browser. There's no need for a local server, as the app runs entirely on the client side.

-----

## Project Structure

  - `index.html`: The main HTML file that provides the structure of the application.
  - `style.css`: Contains all the CSS for styling and animations.
  - `script.js`: The core JavaScript file that handles all the application logic, including searching for weather, displaying data, and updating the UI.

-----

## Future Enhancements

  - **Integrate with a Live Weather API**: Replace the demo data with a real API like OpenWeatherMap to provide up-to-date, real-time weather information.
  - **Current Location Weather**: Fully implement the "Current Location" feature by integrating the browser's Geolocation API with a live weather API.
  - **Extended Forecast**: Add support for more detailed hourly or 7-day forecasts.
  - **Settings and Customization**: Allow users to switch between Celsius and Fahrenheit or customize the app's theme.
  - **Improved Animations**: Add more specific animations based on the weather conditions (e.g., falling snow, rain drops).
