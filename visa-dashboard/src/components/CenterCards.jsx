import { MapPin, FileStack } from 'lucide-react';

function formatCurrency(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function CenterCards({ centerData }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Center-wise Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {centerData.map((center) => {
          const profit = center.serviceCharges + center.insurance + center.otherCharges;
          const profitMargin = center.totalRevenue > 0
            ? ((profit / center.totalRevenue) * 100).toFixed(1)
            : 0;

          return (
            <div key={center.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <h3 className="text-sm font-semibold text-gray-800">{center.location}</h3>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <FileStack className="w-3 h-3" />
                  {center.invoiceCount}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Total Collections</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(center.totalRevenue)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Embassy Fees</span>
                  <span className="font-medium text-amber-600">{formatCurrency(center.embassyFees)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Service Charges</span>
                  <span className="font-medium text-emerald-600">{formatCurrency(center.serviceCharges)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">GST</span>
                  <span className="font-medium text-purple-600">{formatCurrency(center.gst)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-medium text-cyan-600">{formatCurrency(center.insurance)}</span>
                </div>

                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">Profit</span>
                    <span className="font-bold text-green-600">{formatCurrency(profit)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min(profitMargin, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{profitMargin}% margin</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
