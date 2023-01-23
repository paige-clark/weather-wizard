function BottomButtons({ date, currentDate, setCurrentDate }) {
  // const currentWeather = days[date.currentDay][date.timeOfDay];

  return (
    <div className="BottomButtons">
      <button>🔼</button>
      <button>💾</button>
      <button>⚙️</button>
    </div>
  );
}

export default BottomButtons;
