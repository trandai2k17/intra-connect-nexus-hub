import { useState, useEffect } from "react";
import { Clock, MapPin, Cloud, Sun, CloudRain, CloudSnow, Zap, Wind, CloudDrizzle } from "lucide-react";

interface TimeZoneInfo {
  name: string;
  timezone: string;
  location: string;
  flag: string;
}

interface WeatherData {
  temp: string;
  condition: string;
  humidity: string;
  icon: string;
  windSpeed: string;
}

const timeZones: TimeZoneInfo[] = [
  {
    name: "Local",
    timezone: "Asia/Ho_Chi_Minh",
    location: "Vĩnh Tân Vsip 2",
    flag: "🇻🇳"
  },
  {
    name: "GMT",
    timezone: "GMT",
    location: "London",
    flag: "🇬🇧"
  },
  {
    name: "CST",
    timezone: "America/Chicago",
    location: "Chicago",
    flag: "🇺🇸"
  }
];

const getWeatherIcon = (condition: string, iconCode: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return conditionLower.includes('heavy') ? CloudRain : CloudDrizzle;
  }
  if (conditionLower.includes('cloud')) {
    return Cloud;
  }
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return Sun;
  }
  if (conditionLower.includes('snow')) {
    return CloudSnow;
  }
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return Zap;
  }
  if (conditionLower.includes('wind')) {
    return Wind;
  }
  
  // Default based on time of day
  const hour = new Date().getHours();
  return (hour >= 6 && hour <= 18) ? Sun : Cloud;
};

export function TimeWeatherWidget() {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});
  const [weather, setWeather] = useState<WeatherData>({
    temp: "--°C",
    condition: "Loading...",
    humidity: "--%",
    icon: "01d",
    windSpeed: "-- km/h"
  });

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: string } = {};
      
      timeZones.forEach(tz => {
        const now = new Date();
        const timeString = now.toLocaleString("en-US", {
          timeZone: tz.timezone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
        times[tz.name] = timeString;
      });
      
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using OpenWeatherMap API for Binh Duong, Vietnam
        const API_KEY = "demo"; // In real app, use environment variable
        const lat = "10.9804"; // Binh Duong coordinates
        const lon = "106.6519";
        
        // For demo, using mock data that simulates real weather conditions
        const mockWeatherData = [
          { temp: "32°C", condition: "Sunny", humidity: "68%", icon: "01d", windSpeed: "8 km/h" },
          { temp: "28°C", condition: "Partly Cloudy", humidity: "75%", icon: "02d", windSpeed: "12 km/h" },
          { temp: "25°C", condition: "Light Rain", humidity: "85%", icon: "10d", windSpeed: "15 km/h" },
          { temp: "30°C", condition: "Cloudy", humidity: "70%", icon: "04d", windSpeed: "10 km/h" },
        ];
        
        const randomWeather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)];
        setWeather(randomWeather);
        
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setWeather({
          temp: "30°C",
          condition: "Sunny",
          humidity: "72%",
          icon: "01d",
          windSpeed: "8 km/h"
        });
      }
    };

    fetchWeather();
    // Update weather every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);

    return () => clearInterval(weatherInterval);
  }, []);

  const WeatherIcon = getWeatherIcon(weather.condition, weather.icon);

  return (
    <div className="flex items-center gap-4">
      {/* Weather Section */}
      <div className="flex items-center gap-2 pr-3">
        <WeatherIcon className="w-4 h-4 text-foreground/70" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {weather.temp}
          </span>
          <span className="text-xs text-muted-foreground">
            {weather.condition}
          </span>
        </div>
      </div>

      {/* Time Zones - Horizontal Layout */}
      <div className="flex items-center gap-4">
        {timeZones.map((tz) => (
          <div key={tz.name} className="flex items-center gap-2">
            <span className="text-sm">{tz.flag}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-foreground/70" />
                <span className="text-xs font-mono text-foreground">
                  {currentTimes[tz.name]?.split(', ')[1] || '--:--'}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {tz.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-foreground/60" />
                <span className="text-xs text-muted-foreground">
                  {tz.location}
                </span>
                <span className="text-xs text-muted-foreground">
                  {currentTimes[tz.name]?.split(', ')[0] || '--/--/----'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}