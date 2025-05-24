import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const PrayerTimes = () => {
  const [TodayDate, setTodayDate] = useState("");
  const [boolForSlider, setBoolForSlide] = useState(true);
  const [currentmonth, setCurrentmonth] = useState("");
  const [timelist, settimelist] = useState([
    { name: "الفجر", time: "04 35" },
    { name: "الظہر", time: "13 15" },
    { name: "العصر", time: "17 30" },
    { name: "المغرب", time: "19 05" },
    { name: "العشاء", time: "21 00" },
  ]);

  const [englishmonth, setEnglishmonth] = useState([
    "جنوری",
    "فروری",
    "مارچ",
    "اپریل",
    "مئ",
    "جون",
    "جولائی",
    "اگست",
    "ستمبر",
    "اکتوبر",
    "نومبر",
    "دسمبر",
  ]);
  const [time, setTime] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const [upcomingPrayer, setUpcomingPrayer] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const TodayDate = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedHours = String(hours % 12 || 12).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      setTime({
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
      });

      const nowInMinutes = hours * 60 + minutes;

      const upcoming = timelist.find((item) => {
        const [h, m] = item.time.split(" ").map(Number);
        return h * 60 + m >= nowInMinutes;
      });

      if (upcoming) {
        setUpcomingPrayer(upcoming.name);

        // Calculate remaining time
        const [uph, upm] = upcoming.time.split(" ").map(Number);
        const upcomingInMinutes = uph * 60 + upm;
        const diff = upcomingInMinutes - nowInMinutes;

        const remHours = Math.floor(diff / 60);
        const remMinutes = diff % 60;

        setRemainingTime(
          `${String(remHours).padStart(2, "0")}:${String(remMinutes).padStart(
            2,
            "0"
          )}`
        );
      } else {
        setUpcomingPrayer("کوئی نماز باقی نہیں");
        setRemainingTime("--:--");
      }
    };
    const now = new Date();
    setTodayDate(now.getDate());
    setCurrentmonth(now.getMonth() + 1);

    updateTime();
    const interval = setInterval(updateTime, 1000);
    const boolinterval = setInterval(() => {
      setBoolForSlide((prev) => !prev);
      console.log("Log from boolll");
    }, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(boolinterval);
    };
  }, [timelist]);

  return (
    <div className="bg-black text-center p-4 w-72 rounded-xl border-4 border-gray-800 shadow-lg ">
      {/* <!-- Top Arabic Text --> */}
      <div className="text-glow-white text-sm font-bold mb-1">
        لا إله إلا الله محمد رسول الله
      </div>

      {/* <!-- Clock Time --> */}
      <div className="flex justify-center gap-2 mb-4">
        <span className="text-glow-red text-4xl font-bold">
          {time.hours}:{time.minutes}
        </span>
        <span className="text-glow-red text-2xl font-bold">{time.seconds}</span>
      </div>

      {/* <!-- Status Lights --> */}
      <div className="flex justify-end items-center bg-gray-400/10 rounded-sm py-1 pr-1">
        <div className="flex gap-x-2  mr-4">
          <div className=" animate-pulse text-xl text-glow-green">
            {remainingTime}
          </div>
          {!remainingTime ? (
            <div className="flex gap-4 text-glow-green animate-pulse text-white">
              <span className="text-2xl">_</span>
              <span className="text-2xl">_</span>
            </div>
          ) : null}
        </div>
        <p className="text-glow-white text-sm w-24">بقیہ وقت برائے جماعت</p>
      </div>

      {/* <!-- Prayer Times --> */}
      <div className="space-y-7 text-lg font-semibold text-right px-2 mt-4">
        {timelist.map((item) => {
          return (
            <div className="flex justify-between">
              <span
                className={`${
                  item.name === upcomingPrayer
                    ? "text-glow-green"
                    : "text-glow-red"
                } tracking-widest bg-gray-400/10 px-4 rounded-sm w-24`}
              >
                {(() => {
                  const [h, m] = item.time.split(" ").map(Number);
                  const hour12 = h % 12 || 12;
                  return `${String(hour12).padStart(2, "0")}:${String(
                    m
                  ).padStart(2, "0")}`;
                })()}
              </span>
              <span
                className={`${
                  item.name === upcomingPrayer
                    ? "text-glow-green"
                    : "text-glow-white"
                } bg-gray-400/10 px-4 rounded-sm w-20`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* curenntdate  */}

      <div className="bottom bg-gray-400/10 mt-4 h-11 rounded-sm flex items-center justify-center gap-6 text-glow-green">
        <div
          className={`flex items-center gap-6 transition-transform duration-500 ${
            boolForSlider ? "animate-slide-in-left" : "animate-slide-in-right"
          }`}
        >
          <p className="text-2xl mb-2">
            {boolForSlider ? englishmonth[currentmonth - 1] : "اشراق"}
          </p>
          <p className="text-2xl">{boolForSlider ? TodayDate : "5 : 21"}</p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;

// <div class="flex justify-between text-glow-red">
//   <span>4:35</span>
//   <span class="text-glow-white">الفجر</span>
// </div>;
// اشراق;
