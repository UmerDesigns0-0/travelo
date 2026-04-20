import { calculateTrendPercentage } from "~/lib/myutils";
const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount,
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );

  const isDec = trend === "decrement";

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`/assets/icons/${isDec ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                className="size-5"
                alt="trend arrow"
              />
              <figcaption
                className={`text-sm font-medium ${isDec ? "text-red-500" : "text-green-500"}`}
              >
                {percentage.toFixed(0)}%
              </figcaption>
              <p title="vs last month" className="text-sm text-slate-500 truncate">vs last month</p>
            </figure>
          </div>
        </div>
        <img
          src={`assets/icons/${isDec ? "decrement.svg" : "increment.svg"}`}
          alt="trend graph"
          className="xl-w-32 w-full h-full md:h-32 xl:h-full select-none"
          draggable={false}
        />
      </div>
    </article>
  );
};

export default StatsCard;
