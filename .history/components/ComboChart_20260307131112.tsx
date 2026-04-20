import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatYAxisValue } from "~/lib/myutils";

const data = [
  { name: "Jan", value: 1400 },
  { name: "Feb", value: 868 },
  { name: "Mar", value: 1000 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 800 },
  { name: "Jun", value: 1400 },
];

const ComboChart = ({ chartHeading }: { chartHeading?: string }) => {
  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {chartHeading || ""}
        </h3>

        <div className="h-50 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                {/* Strong downward shadow */}
                <filter
                  id="lineShadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feOffset dx="0" dy="12" result="offsetBlur" />
                  <feFlood floodColor="#3b82f6" floodOpacity="0.35" />
                  <feComposite in2="offsetBlur" operator="in" result="shadow" />
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                  <linearGradient
                    id="lineShadowGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    {/* near the line */}
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.45} />

                    {/* mid fade */}
                    <stop offset="55%" stopColor="#93c5fd" stopOpacity={0.25} />

                    {/* bottom almost white */}
                    <stop
                      offset="100%"
                      stopColor="#ffffff"
                      stopOpacity={0.05}
                    />
                  </linearGradient>

                  <filter id="softBlur">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </filter>
              </defs>

              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#3b82f6" />

                  <stop offset="25%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#60a5fa" />

                  <stop offset="50%" stopColor="#93c5fd" />
                  <stop offset="75%" stopColor="#93c5fd" />

                  <stop offset="75%" stopColor="#bfdbfe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                strokeOpacity={0.3}
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                width={40}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxisValue}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              />
              <Bar
                dataKey="value"
                barSize={40}
                fill="url(#barGradient)"
                radius={8}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                filter="url(#lineShadow)"
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "white",
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComboChart;
