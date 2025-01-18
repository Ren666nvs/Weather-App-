import React from "react";

const LeftSide = (props) => {
  const { weather, selectedCity, weatherLoading } = props;

  // Display a loading indicator if weather data is still loading
  if (weatherLoading) {
    return <p>Loading...</p>;
  }

  // Fallback in case weather data is missing
  if (!weather || !weather.condition) {
    return <p>Weather data is not available</p>;
  }

  // Determine the appropriate image based on weather conditions
  const getWeatherImage = () => {
    const conditions = weather.condition.toLowerCase();

    if (conditions.includes("cloud")) {
      return "./image/sun.cloud.png";
    } else if (conditions.includes("rain")) {
      return "./image/sun.rain.png";
    } else if (conditions.includes("snow")) {
      return "./image/sun.snow.png";
    } else if (conditions.includes("wind")) {
      return "./image/sun.wind.png";
    } else {
      return "./image/sun.png";
    }
  };

  return (
    <section className="relative flex">
      <div className="relative flex w-[567px] justify-center z-10">
        <div className="z-20 w-[103px] h-[207px] rounded-[10.5px] overflow-hidden shadow-lg bg-white/75">
          <div className="space-y-12 px-10 py-14 backdrop-blur-lg">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h4 className="text-gray-400">{weather.date || "N/A"}</h4>
                <h2 className="text-5xl font-extrabold text-gray-900">
                  {selectedCity || "Unknown"}
                </h2>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g opacity="0.2">
                  <path
                    d="M20 3.33334C13.55 3.33334 8.33331 8.55001 8.33331 15C8.33331 23.75 20 36.6667 20 36.6667C20 36.6667 31.6666 23.75 31.6666 15C31.6666 8.55001 26.45 3.33334 20 3.33334ZM11.6666 15C11.6666 10.4 15.4 6.66668 20 6.66668C24.6 6.66668 28.3333 10.4 28.3333 15C28.3333 19.8 23.5333 26.9833 20 31.4667C16.5333 27.0167 11.6666 19.75 11.6666 15Z"
                    fill="black"
                  />
                  <path
                    d="M20 19.1667C22.3012 19.1667 24.1666 17.3012 24.1666 15C24.1666 12.6988 22.3012 10.8333 20 10.8333C17.6988 10.8333 15.8333 12.6988 15.8333 15C15.8333 17.3012 17.6988 19.1667 20 19.1667Z"
                    fill="black"
                  />
                </g>
              </svg>
            </div>
            <div>
              <img src={getWeatherImage()} alt="Weather Condition" />
            </div>
          </div>
          <div className="px-12">
            <div className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
              {weather.maxTemp || "N/A"}°
            </div>
            <h6 className="font-extrabold mb-12 text-yellow-400">
              {weather.condition || "Unknown"}
            </h6>
          </div>
        </div>
        <div className="absolute -top-10 -left-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 176 176"
            fill="none"
          >
            <circle cx="88" cy="88" r="88" fill="#FF8E27" />
            <circle
              cx="88"
              cy="88"
              r="88"
              fill="url(#paint0_radial_202_248)"
              fillOpacity="0.35"
            />
            <defs>
              <radialGradient
                id="paint0_radial_202_248"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(88 88) rotate(90) scale(88)"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default LeftSide;
