import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function formatLakh(value) {
  return `₹${(value / 100000).toFixed(1)}L`;
}

const monthNames = {
  '2026-01': 'Jan', '2026-02': 'Feb', '2026-03': 'Mar',
  '2026-04': 'Apr', '2026-05': 'May', '2026-06': 'Jun',
};

export default function RevenueChart({ monthlyData }) {
  const chartData = monthlyData.map(m => ({
    ...m,
    name: monthNames[m.month] || m.month,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tickFormatter={formatLakh} tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="embassyFees" name="Embassy Fees" fill="#f59e0b" radius={[2, 2, 0, 0]} />
          <Bar dataKey="profit" name="Profit (Service + Insurance + Other)" fill="#22c55e" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
