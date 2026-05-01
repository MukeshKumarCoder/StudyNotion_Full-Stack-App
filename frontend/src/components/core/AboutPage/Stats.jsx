const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className="w-full min-w-0 bg-richBlack-700">
      <div className="mx-auto flex w-11/12 min-w-0 max-w-maxContent flex-col justify-between gap-6 px-1 py-4 text-white sm:gap-10 ">
        <div className="grid grid-cols-2 gap-y-2 text-center md:grid-cols-4 md:gap-y-0">
          {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-6 sm:py-8 md:py-10" key={index}>
                <p className="text-2xl font-bold text-richBlack-5 sm:text-3xl md:text-[30px]">
                  {data.count}
                </p>
                <p className="px-1 text-sm font-semibold text-richBlack-500 sm:text-[16px]">
                  {data.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
