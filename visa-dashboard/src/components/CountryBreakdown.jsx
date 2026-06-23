import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#8b5cf6', '#06b6d4', '#ef4444', '#ec4899'];

function formatCurrency(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function CountryBreakdown({ countryData }) {
  const total = countryData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Country-wise Revenue</h2>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={260}>
          <PieChart>
            <Pie
              data={countryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="revenue"
              nameKey="country"
              paddingAngle={2}
            >
              {countryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {countryData.map((item, index) => {
            const pct = total > 0 ? ((item.revenue / total) * 100).toFixed(1) : 0;
            return (
              <div key={item.country} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">{item.country}</span>
                    <span className="text-gray-500">{pct}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{item.count} applications</span>
                    <span>{formatCurrency(item.revenue)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
