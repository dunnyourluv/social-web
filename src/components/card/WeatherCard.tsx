import { MoreOutlined } from "@ant-design/icons";
import Box from "../primarys/Box";
import { useEffect, useState } from "react";
import Weather, { WeatherData } from "../../services/Weather";

function Clock() {
    function format(time: number) {
        return time < 10 ? `0${time}` : `${time}`;
    }

    const [time, setTime] = useState({
        hour: "",
        minute: "",
        second: "0",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setTime({
                hour: format(date.getHours()),
                minute: format(date.getMinutes()),
                second: format(date.getSeconds()),
            });
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <div className="my-3">
            <p className="text-center text-2xl font-bold">
                {time.hour}:{time.minute}:{time.second}
            </p>
        </div>
    );
}

function WeatherCard() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    useEffect(() => {
        Weather.getWeather("Đà Nẵng").then((data) => {
            setWeather(data);
        });
    }, []);

    const formatDay = (day: number) => {
        switch (day) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "";
        }
    };

    if (!weather) return <></>;
    return (
        <Box>
            <div
                className="bg-cover bg-no-repeat bg-center text-white p-2"
                style={{
                    backgroundImage:
                        "url(https://img.freepik.com/free-vector/gradient-abstract-background-with-different-shapes_23-2149110301.jpg?w=1060&t=st=1685096957~exp=1685097557~hmac=6da22a9a0ebcad816025d48a6abf8d9ea91818a97a1c377512f23abf142f656c)",
                }}
            >
                <div className="">
                    <MoreOutlined className="text-xl cursor-pointer block ml-auto font-bold text-right" />
                </div>
                <ul className="">
                    <li className="text-center">
                        <h2 className="text-xl font-bold">{weather.name}</h2>
                        <h2 className="text-4xl text-center font-bold">
                            {weather.main.temp}℃
                        </h2>
                        <p className="text-center font-bold">{formatDay(new Date().getDay())}</p>
                        <div className="flex justify-around">
                            <p>real feel: {weather.main.feels_like}℃</p>
                            <p>humidity: {weather.main.humidity}%</p>
                        </div>
                        <Clock />
                    </li>
                </ul>
            </div>
        </Box>
    );
}

export default WeatherCard;
