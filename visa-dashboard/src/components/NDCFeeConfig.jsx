import { useState } from 'react';
import { Settings, Save, Plus, Trash2 } from 'lucide-react';
import { visaTypes } from '../data/mockData';

export default function NDCFeeConfig() {
  const [fees, setFees] = useState(
    visaTypes.map(v => ({ ...v, id: `${v.type}-${v.country}` }))
  );
  const [saved, setSaved] = useState(false);

  function handleFeeChange(id, newFee) {
    setFees(fees.map(f => f.id === id ? { ...f, embassyFee: Number(newFee) } : f));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleAdd() {
    const newId = `New-Custom-${Date.now()}`;
    setFees([...fees, { id: newId, type: '', country: '', embassyFee: 0 }]);
  }

  function handleRemove(id) {
    setFees(fees.filter(f => f.id !== id));
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">NDC / Embassy Fee Configuration</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Visa Type
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Visa Type</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Country</th>
              <th className="text-right py-2.5 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Embassy Fee (₹)</th>
              <th className="text-center py-2.5 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400 w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {fee.type || 'New'}
                  </span>
                </td>
                <td className="py-2 px-3 text-gray-700">{fee.country || '—'}</td>
                <td className="py-2 px-3 text-right">
                  <input
                    type="number"
                    value={fee.embassyFee}
                    onChange={(e) => handleFeeChange(fee.id, e.target.value)}
                    className="w-28 text-right border border-gray-200 rounded-lg px-2.5 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => handleRemove(fee.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Configure the embassy/NDC fee for each visa type. These fees are pass-through and excluded from profit calculations.
      </p>
    </div>
  );
}
