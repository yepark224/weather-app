import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3. 버튼이 5개 있다.(1개는 현재위치, 4개 다른 도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
const API_KEY = process.env.REACT_APP_API_KEY ;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["tokyo", "coquitlam", "seoul"];
  const [loading, setLoading] = useState(false);
  

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const cityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
        <ClipLoader
          color="#f88c6b"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <div className="buttons">
            <WeatherButton
              cities={cities}
              setCity={setCity}
              cityChange={cityChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
