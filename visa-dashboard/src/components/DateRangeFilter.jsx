import { Calendar, Filter } from 'lucide-react';
import { centers } from '../data/mockData';

export default function DateRangeFilter({ startDate, endDate, selectedCenter, onStartDateChange, onEndDateChange, onCenterChange }) {
  const presets = [
    { label: 'This Month', start: '2026-06-01', end: '2026-06-23' },
    { label: 'Last Month', start: '2026-05-01', end: '2026-05-31' },
    { label: 'Last 3 Months', start: '2026-04-01', end: '2026-06-23' },
    { label: 'YTD', start: '2026-01-01', end: '2026-06-23' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Date Range</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => { onStartDateChange(preset.start); onEndDateChange(preset.end); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                startDate === preset.start && endDate === preset.end
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCenter}
            onChange={(e) => onCenterChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Centers</option>
            {centers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
