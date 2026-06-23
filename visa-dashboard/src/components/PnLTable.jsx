function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function PnLTable({ pnl }) {
  const rows = [
    { label: 'Total Collections', value: pnl.totalRevenue, indent: false, bold: true, color: 'text-gray-900' },
    { label: '', value: null, divider: true },
    { label: 'Embassy / NDC Fees (Pass-through)', value: pnl.embassyFees, indent: true, color: 'text-amber-600', negative: true },
    { label: '', value: null, divider: true },
    { label: 'Gross Income', value: pnl.grossIncome, indent: false, bold: true, color: 'text-blue-700' },
    { label: '', value: null, divider: true },
    { label: 'Revenue Breakdown:', value: null, indent: false, header: true },
    { label: 'Service Charges', value: pnl.serviceCharges, indent: true, color: 'text-emerald-600' },
    { label: 'GST Collected', value: pnl.gst, indent: true, color: 'text-purple-600' },
    { label: 'Insurance Revenue', value: pnl.insurance, indent: true, color: 'text-cyan-600' },
    { label: 'Other Charges (Docs + Photo + Courier)', value: pnl.otherCharges, indent: true, color: 'text-gray-600' },
    { label: '', value: null, divider: true },
    { label: 'Net Profit', value: pnl.netProfit, indent: false, bold: true, color: 'text-green-700', highlight: true },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Profit & Loss Statement</h2>
      <div className="divide-y divide-gray-100">
        {rows.map((row, i) => {
          if (row.divider) {
            return <div key={i} className="border-t border-gray-100" />;
          }
          if (row.header) {
            return (
              <div key={i} className="py-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{row.label}</span>
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`flex justify-between py-2.5 ${row.indent ? 'pl-4' : ''} ${row.highlight ? 'bg-green-50 -mx-5 px-5 rounded-lg' : ''}`}
            >
              <span className={`text-sm ${row.bold ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                {row.label}
              </span>
              <span className={`text-sm font-semibold ${row.color}`}>
                {row.negative ? '− ' : ''}{row.value !== null ? formatCurrency(Math.abs(row.value)) : ''}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Period: Selected date range</span>
          <span>{pnl.invoiceCount} total invoices processed</span>
        </div>
      </div>
    </div>
  );
}
