import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function InvoiceTable({ invoices }) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const pageSize = 15;

  const filtered = invoices.filter(inv =>
    inv.applicantName.toLowerCase().includes(search.toLowerCase()) ||
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.country.toLowerCase().includes(search.toLowerCase()) ||
    inv.visaType.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageInvoices = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Invoice Details</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {['Invoice #', 'Date', 'Applicant', 'Center', 'Visa', 'Country', 'Embassy Fee', 'Service', 'GST', 'Insurance', 'Other', 'Total'].map(h => (
                <th key={h} className="text-left py-2.5 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageInvoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-2 px-2 text-xs font-mono text-primary-600">{inv.id}</td>
                <td className="py-2 px-2 text-xs text-gray-600 whitespace-nowrap">{inv.date}</td>
                <td className="py-2 px-2 text-xs text-gray-800 font-medium whitespace-nowrap">{inv.applicantName}</td>
                <td className="py-2 px-2 text-xs text-gray-500 whitespace-nowrap">{inv.centerName.replace(' Visa Center', '')}</td>
                <td className="py-2 px-2">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {inv.visaType}
                  </span>
                </td>
                <td className="py-2 px-2 text-xs text-gray-600">{inv.country}</td>
                <td className="py-2 px-2 text-xs text-amber-600 font-medium text-right">{formatCurrency(inv.embassyFee)}</td>
                <td className="py-2 px-2 text-xs text-emerald-600 font-medium text-right">{formatCurrency(inv.serviceCharge)}</td>
                <td className="py-2 px-2 text-xs text-purple-600 font-medium text-right">{formatCurrency(inv.gst)}</td>
                <td className="py-2 px-2 text-xs text-cyan-600 font-medium text-right">{formatCurrency(inv.insurance)}</td>
                <td className="py-2 px-2 text-xs text-gray-500 font-medium text-right">{formatCurrency(inv.otherCharges)}</td>
                <td className="py-2 px-2 text-xs text-gray-900 font-bold text-right">{formatCurrency(inv.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length} invoices
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500">Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
