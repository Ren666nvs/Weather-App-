
// import React from "react";

// export const LeftSide = (props) => {
//   const { weather } = props;
//   if (!weather || !weather.max_c) {
//     return <div>Weather data is not available</div>;
//   }

//   return (
//     <div>
//       <div>Max Temp: {weather.max_c}°C</div>
//       <div>Min Temp: {weather.min_c}°C</div>
//       <div>Condition: {weather.condition}</div>
//       <div>Date: {weather.date}</div>
//     </div>
//   );
// };
import React from "react";

const LeftSide = (props) => {
  const { weather, selectedCity } = props;

  return (
    <section className="relative flex flex-1 items-center justify-center">
      <section className="relative flex">
        <div className="relative flex w-[567px] justify-center z-10">
          <div className="z-20 w-103 h-207 rounded-10.5 overflow-hidden shadow-lg bg-white/75 rounded-[48px]">
            <div className="space-y-12 px-10 py-14 backdrop-blur-lg">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h4 className="text-gray-400">
                    {weather.date || "Unknown Date"}
                  </h4>
                  <h2 className="h-12 text-5xl font-extrabold text-gray-900">
                    {selectedCity || "Unknown City"}
                  </h2>
                </div>
              </div>
              <div className="px-12">
                <div className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
                  {weather.maxTemp || "N/A"}°
                </div>
                <h6 className="font-extrabold mb-12 h-6px">
                  {weather.condition || "Unknown Condition"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LeftSide;
