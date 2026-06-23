import { IndianRupee, Landmark, Receipt, ShieldCheck, TrendingUp, FileText } from 'lucide-react';

function formatCurrency(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

const cards = [
  { key: 'totalRevenue', label: 'Total Collections', icon: IndianRupee, color: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-700' },
  { key: 'embassyFees', label: 'Embassy / NDC Fees', icon: Landmark, color: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-700' },
  { key: 'serviceCharges', label: 'Service Charges', icon: Receipt, color: 'bg-emerald-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { key: 'gst', label: 'GST Collected', icon: FileText, color: 'bg-purple-500', lightBg: 'bg-purple-50', textColor: 'text-purple-700' },
  { key: 'insurance', label: 'Insurance Revenue', icon: ShieldCheck, color: 'bg-cyan-500', lightBg: 'bg-cyan-50', textColor: 'text-cyan-700' },
  { key: 'netProfit', label: 'Net Profit', icon: TrendingUp, color: 'bg-green-500', lightBg: 'bg-green-50', textColor: 'text-green-700' },
];

export default function SummaryCards({ pnl }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map(({ key, label, icon: Icon, lightBg, textColor }) => (
        <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${lightBg} mb-3`}>
            <Icon className={`w-5 h-5 ${textColor}`} />
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
          <p className={`text-xl font-bold mt-1 ${textColor}`}>
            {formatCurrency(pnl[key] || 0)}
          </p>
          {key === 'totalRevenue' && (
            <p className="text-xs text-gray-400 mt-1">{pnl.invoiceCount} invoices</p>
          )}
        </div>
      ))}
    </div>
  );
}
