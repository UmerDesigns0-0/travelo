import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatYAxisValue } from "~/lib/myutils";

const data = [
  { name: "January", value: 1400 },
  { name: "February", value: 868 },
  { name: "March", value: 1000 },
  { name: "April", value: 1500 },
  { name: "May", value: 800 },
  { name: "June", value: 1400 },
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
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                {/* gradient for bars */}
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

                {/* gradient for line shadow area */}
                <linearGradient
                  id="lineShadowGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {/* near line */}
                  <stop offset="0%" stopColor="#bbd5f2" stopOpacity={5} />

                  {/* middle */}
                  <stop offset="50%" stopColor="#d0e2f7" stopOpacity={3} />

                  {/* bottom */}
                  <stop offset="100%" stopColor="#dfeaf7" stopOpacity={2} />
                </linearGradient>

                {/* blur for the area */}
                <filter id="softBlur" x="0%" y="0%" width="100%" height="140%">
                  <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
                  <feGaussianBlur stdDeviation="10" result="blur" />
                </filter>
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
                tickFormatter={(value) => value.slice(0, 3)}
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

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#lineShadowGradient)"
                filter="url(#softBlur)"
                baseValue="dataMin"
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComboChart;
