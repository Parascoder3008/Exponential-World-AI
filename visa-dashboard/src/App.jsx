import { useState } from 'react';
import { LayoutDashboard, Upload, Settings } from 'lucide-react';
import DateRangeFilter from './components/DateRangeFilter';
import SummaryCards from './components/SummaryCards';
import CenterCards from './components/CenterCards';
import RevenueChart from './components/RevenueChart';
import CountryBreakdown from './components/CountryBreakdown';
import PnLTable from './components/PnLTable';
import NDCFeeConfig from './components/NDCFeeConfig';
import InvoiceTable from './components/InvoiceTable';
import {
  getFilteredInvoices,
  aggregateByCenter,
  calculatePnL,
  getMonthlyTrend,
  getCountryBreakdown,
  invoices as allInvoices,
} from './data/mockData';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'invoices', label: 'Invoices', icon: Upload },
  { id: 'settings', label: 'NDC Fee Config', icon: Settings },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-23');
  const [selectedCenter, setSelectedCenter] = useState('all');

  const filteredInvoices = getFilteredInvoices(startDate, endDate, selectedCenter);
  const centerData = aggregateByCenter(filteredInvoices);
  const pnl = calculatePnL(filteredInvoices);
  const monthlyData = getMonthlyTrend(allInvoices);
  const countryData = getCountryBreakdown(filteredInvoices);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Visa Revenue Dashboard</h1>
                <p className="text-xs text-gray-400">Immigration Services Management</p>
              </div>
            </div>

            <nav className="flex gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <>
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              selectedCenter={selectedCenter}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCenterChange={setSelectedCenter}
            />

            <SummaryCards pnl={pnl} />

            <CenterCards centerData={centerData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <RevenueChart monthlyData={monthlyData} />
              <CountryBreakdown countryData={countryData} />
            </div>

            <PnLTable pnl={pnl} />
          </>
        )}

        {activeTab === 'invoices' && (
          <>
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              selectedCenter={selectedCenter}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCenterChange={setSelectedCenter}
            />
            <InvoiceTable invoices={filteredInvoices} />
          </>
        )}

        {activeTab === 'settings' && (
          <NDCFeeConfig />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-center text-gray-400">
            Visa Revenue Dashboard — MVP Demo &middot; Data shown is simulated for demonstration purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
