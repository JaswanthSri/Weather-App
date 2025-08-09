  class WeatherApp {
            constructor() {
                this.apiKey = 'demo'; // Using demo mode
                this.currentWeatherData = null;
                this.init();
                this.createParticles();
                this.loadDefaultWeather();
            }

            init() {
                const searchBtn = document.getElementById('searchBtn');
                const locationBtn = document.getElementById('locationBtn');
                const cityInput = document.getElementById('cityInput');

                searchBtn.addEventListener('click', () => this.searchWeather());
                locationBtn.addEventListener('click', () => this.getCurrentLocation());
                cityInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.searchWeather();
                });
            }

            createParticles() {
                const particlesContainer = document.getElementById('particles');
                for (let i = 0; i < 50; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.width = (Math.random() * 6 + 2) + 'px';
                    particle.style.height = particle.style.width;
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                    particlesContainer.appendChild(particle);
                }
            }

            async loadDefaultWeather() {
                // Load demo weather for major cities
                const demoWeather = this.getDemoWeather('New York');
                this.displayWeather(demoWeather);
            }

            getDemoWeather(city) {
                const cities = {
                    'New York': { temp: 22, feels_like: 25, humidity: 65, wind: 8, pressure: 1013, description: 'Partly Cloudy', icon: '⛅' },
                    'London': { temp: 15, feels_like: 13, humidity: 78, wind: 12, pressure: 1008, description: 'Rainy', icon: '🌧️' },
                    'Tokyo': { temp: 28, feels_like: 32, humidity: 70, wind: 6, pressure: 1020, description: 'Sunny', icon: '☀️' },
                    'Sydney': { temp: 24, feels_like: 26, humidity: 60, wind: 10, pressure: 1015, description: 'Clear Sky', icon: '🌤️' },
                    'Mumbai': { temp: 32, feels_like: 38, humidity: 85, wind: 15, pressure: 1005, description: 'Hot & Humid', icon: '🌡️' }
                };

                const baseWeather = cities[city] || cities['New York'];
                return {
                    name: city,
                    country: 'Demo',
                    main: {
                        temp: baseWeather.temp,
                        feels_like: baseWeather.feels_like,
                        humidity: baseWeather.humidity,
                        pressure: baseWeather.pressure
                    },
                    weather: [{
                        main: baseWeather.description,
                        description: baseWeather.description,
                        icon: baseWeather.icon
                    }],
                    wind: { speed: baseWeather.wind },
                    visibility: Math.floor(Math.random() * 10 + 5),
                    dt: Date.now() / 1000
                };
            }

            async searchWeather() {
                const city = document.getElementById('cityInput').value.trim();
                if (!city) return;

                this.showLoading();
                
                // Simulate API call with demo data
                setTimeout(() => {
                    const weatherData = this.getDemoWeather(city);
                    this.displayWeather(weatherData);
                }, 1000);
            }

            getCurrentLocation() {
                if (navigator.geolocation) {
                    this.showLoading();
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            // Simulate getting weather for current location
                            setTimeout(() => {
                                const weatherData = this.getDemoWeather('Your Location');
                                weatherData.name = 'Your Location';
                                this.displayWeather(weatherData);
                            }, 1000);
                        },
                        (error) => {
                            this.showError('Unable to get your location. Please search for a city instead.');
                        }
                    );
                } else {
                    this.showError('Geolocation is not supported by this browser.');
                }
            }

            showLoading() {
                document.getElementById('weatherContent').innerHTML = `
                    <div class="loading">
                        <div class="spinner"></div>
                        <p>Getting your weather data...</p>
                    </div>
                `;
            }

            showError(message) {
                document.getElementById('weatherContent').innerHTML = `
                    <div class="error">
                        <h3>⚠️ Error</h3>
                        <p>${message}</p>
                    </div>
                `;
            }

            displayWeather(data) {
                const forecast = this.generateForecast();
                const lastUpdated = new Date(data.dt * 1000).toLocaleString();

                const weatherHtml = `
                    <div class="weather-grid">
                        <div class="weather-card current-weather">
                            <div class="weather-header">
                                <div class="location-info">
                                    <h2>${data.name}</h2>
                                    <p>Last updated: ${lastUpdated}</p>
                                </div>
                                <div class="weather-icon">${data.weather[0].icon}</div>
                            </div>
                            
                            <div class="main-temp">${Math.round(data.main.temp)}°C</div>
                            <p style="text-align: center; font-size: 1.2rem; color: #636e72; margin-bottom: 25px;">
                                ${data.weather[0].description}
                            </p>
                            
                            <div class="weather-details">
                                <div class="detail-item">
                                    <div class="detail-label">Feels Like</div>
                                    <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Humidity</div>
                                    <div class="detail-value">${data.main.humidity}%</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Wind Speed</div>
                                    <div class="detail-value">${data.wind.speed} km/h</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Pressure</div>
                                    <div class="detail-value">${data.main.pressure} hPa</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">Visibility</div>
                                    <div class="detail-value">${data.visibility} km</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">UV Index</div>
                                    <div class="detail-value">${Math.floor(Math.random() * 10 + 1)}</div>
                                </div>
                            </div>
                        </div>

                        <div class="weather-card">
                            <h3 style="margin-bottom: 20px; color: #2d3436;">5-Day Forecast</h3>
                            <div class="forecast-grid">
                                ${forecast.map(day => `
                                    <div class="forecast-item">
                                        <div class="forecast-day">${day.day}</div>
                                        <div class="forecast-icon">${day.icon}</div>
                                        <div class="forecast-temps">
                                            <span class="high-temp">${day.high}°</span>
                                            <span class="low-temp">${day.low}°</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('weatherContent').innerHTML = weatherHtml;
                this.updateBackground(data.weather[0].main);
            }

            generateForecast() {
                const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
                const icons = ['☀️', '⛅', '🌧️', '🌤️', '⛈️'];
                
                return days.map((day, index) => ({
                    day,
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    high: Math.floor(Math.random() * 15 + 20),
                    low: Math.floor(Math.random() * 10 + 10)
                }));
            }

            updateBackground(weatherMain) {
                const backgrounds = {
                    'Clear': 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                    'Clouds': 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                    'Rain': 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
                    'Snow': 'linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%)',
                    'Thunderstorm': 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                    'default': 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
                };

                document.body.style.background = backgrounds[weatherMain] || backgrounds.default;
            }
        }

        // Initialize the weather app
        document.addEventListener('DOMContentLoaded', () => {
            new WeatherApp();
        });

