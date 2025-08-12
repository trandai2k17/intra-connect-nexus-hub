import { useState, useEffect } from "react";
import { Clock, MapPin, CloudSun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TimeZoneInfo {
  name: string;
  timezone: string;
  location: string;
  flag: string;
}

const timeZones: TimeZoneInfo[] = [
  {
    name: "Local",
    timezone: "Asia/Ho_Chi_Minh",
    location: "Ho Chi Minh",
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

export function TimeWeatherWidget() {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});
  const [weather, setWeather] = useState({
    temp: "28°C",
    condition: "Partly Cloudy",
    humidity: "75%"
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

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Weather Section */}
          <div className="flex items-center gap-2 pb-2 border-b border-blue-200 dark:border-blue-700">
            <CloudSun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {weather.temp}
                </span>
                <span className="text-xs text-blue-700 dark:text-blue-300">
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>

          {/* Time Zones */}
          <div className="space-y-2">
            {timeZones.map((tz) => (
              <div key={tz.name} className="flex items-center gap-2">
                <span className="text-lg">{tz.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-blue-900 dark:text-blue-100">
                      {currentTimes[tz.name]?.split(', ')[1] || '--:--'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-xs text-blue-700 dark:text-blue-300 truncate">
                      {tz.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-blue-900 dark:text-blue-100">
                    {tz.name}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    {currentTimes[tz.name]?.split(', ')[0] || '--/--/----'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}