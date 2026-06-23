export const centers = [
  { id: 'C001', name: 'Delhi Visa Center', location: 'New Delhi', status: 'active' },
  { id: 'C002', name: 'Mumbai Visa Center', location: 'Mumbai', status: 'active' },
  { id: 'C003', name: 'Bangalore Visa Center', location: 'Bangalore', status: 'active' },
  { id: 'C004', name: 'Chennai Visa Center', location: 'Chennai', status: 'active' },
  { id: 'C005', name: 'Kolkata Visa Center', location: 'Kolkata', status: 'active' },
];

export const visaTypes = [
  { type: 'Tourist', country: 'USA', embassyFee: 12000 },
  { type: 'Business', country: 'USA', embassyFee: 15000 },
  { type: 'Tourist', country: 'UK', embassyFee: 9500 },
  { type: 'Business', country: 'UK', embassyFee: 12500 },
  { type: 'Schengen', country: 'Europe', embassyFee: 6800 },
  { type: 'Tourist', country: 'Canada', embassyFee: 8500 },
  { type: 'Tourist', country: 'Australia', embassyFee: 10200 },
  { type: 'Student', country: 'USA', embassyFee: 13500 },
  { type: 'Student', country: 'UK', embassyFee: 26000 },
  { type: 'Student', country: 'Canada', embassyFee: 11000 },
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateInvoices() {
  const invoices = [];
  let invoiceId = 1000;

  for (let month = 0; month < 6; month++) {
    const baseDate = new Date(2026, month, 1);
    const daysInMonth = new Date(2026, month + 1, 0).getDate();

    for (const center of centers) {
      const invoicesPerMonth = randomBetween(40, 80);

      for (let i = 0; i < invoicesPerMonth; i++) {
        invoiceId++;
        const day = randomBetween(1, daysInMonth);
        const date = new Date(2026, month, day);
        const visa = visaTypes[randomBetween(0, visaTypes.length - 1)];

        const serviceCharge = randomBetween(1500, 4500);
        const gst = Math.round(serviceCharge * 0.18);
        const insurance = Math.random() > 0.3 ? randomBetween(800, 2500) : 0;
        const documentation = randomBetween(300, 1200);
        const photography = Math.random() > 0.5 ? randomBetween(200, 500) : 0;
        const courier = Math.random() > 0.4 ? randomBetween(150, 400) : 0;

        const otherCharges = documentation + photography + courier;
        const totalAmount = visa.embassyFee + serviceCharge + gst + insurance + otherCharges;

        invoices.push({
          id: `INV-${invoiceId}`,
          centerId: center.id,
          centerName: center.name,
          date: date.toISOString().split('T')[0],
          applicantName: generateName(),
          visaType: visa.type,
          country: visa.country,
          embassyFee: visa.embassyFee,
          serviceCharge,
          gst,
          insurance,
          documentation,
          photography,
          courier,
          otherCharges,
          totalAmount,
        });
      }
    }
  }

  return invoices.sort((a, b) => new Date(a.date) - new Date(b.date));
}

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan',
  'Priya', 'Ananya', 'Shreya', 'Ishita', 'Kavya', 'Riya', 'Neha', 'Pooja',
  'Rahul', 'Amit', 'Suresh', 'Rajesh', 'Deepak', 'Manish', 'Rohit', 'Vikram',
  'Meera', 'Sonia', 'Geeta', 'Sunita', 'Nisha', 'Divya', 'Anjali', 'Swati',
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Nair', 'Joshi',
  'Verma', 'Chopra', 'Malhotra', 'Iyer', 'Menon', 'Das', 'Bose', 'Rao',
  'Agarwal', 'Banerjee', 'Chatterjee', 'Desai', 'Mehta', 'Shah', 'Pillai', 'Kapoor',
];

function generateName() {
  const first = firstNames[randomBetween(0, firstNames.length - 1)];
  const last = lastNames[randomBetween(0, lastNames.length - 1)];
  return `${first} ${last}`;
}

export const invoices = generateInvoices();

export function getFilteredInvoices(startDate, endDate, centerId = 'all') {
  return invoices.filter(inv => {
    const invDate = new Date(inv.date);
    const matchDate = invDate >= new Date(startDate) && invDate <= new Date(endDate);
    const matchCenter = centerId === 'all' || inv.centerId === centerId;
    return matchDate && matchCenter;
  });
}

export function aggregateByCenter(filteredInvoices) {
  const grouped = {};

  for (const center of centers) {
    grouped[center.id] = {
      ...center,
      totalRevenue: 0,
      embassyFees: 0,
      serviceCharges: 0,
      gst: 0,
      insurance: 0,
      otherCharges: 0,
      invoiceCount: 0,
    };
  }

  for (const inv of filteredInvoices) {
    const g = grouped[inv.centerId];
    if (!g) continue;
    g.totalRevenue += inv.totalAmount;
    g.embassyFees += inv.embassyFee;
    g.serviceCharges += inv.serviceCharge;
    g.gst += inv.gst;
    g.insurance += inv.insurance;
    g.otherCharges += inv.otherCharges;
    g.invoiceCount++;
  }

  return Object.values(grouped);
}

export function calculatePnL(filteredInvoices) {
  const totals = {
    totalRevenue: 0,
    embassyFees: 0,
    serviceCharges: 0,
    gst: 0,
    insurance: 0,
    otherCharges: 0,
    invoiceCount: filteredInvoices.length,
  };

  for (const inv of filteredInvoices) {
    totals.totalRevenue += inv.totalAmount;
    totals.embassyFees += inv.embassyFee;
    totals.serviceCharges += inv.serviceCharge;
    totals.gst += inv.gst;
    totals.insurance += inv.insurance;
    totals.otherCharges += inv.otherCharges;
  }

  totals.grossIncome = totals.totalRevenue - totals.embassyFees;
  totals.netProfit = totals.serviceCharges + totals.insurance + totals.otherCharges;

  return totals;
}

export function getMonthlyTrend(allInvoices) {
  const monthly = {};

  for (const inv of allInvoices) {
    const month = inv.date.substring(0, 7);
    if (!monthly[month]) {
      monthly[month] = { month, revenue: 0, embassyFees: 0, profit: 0, count: 0 };
    }
    monthly[month].revenue += inv.totalAmount;
    monthly[month].embassyFees += inv.embassyFee;
    monthly[month].profit += inv.serviceCharge + inv.insurance + inv.otherCharges;
    monthly[month].count++;
  }

  return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month));
}

export function getCountryBreakdown(filteredInvoices) {
  const breakdown = {};

  for (const inv of filteredInvoices) {
    if (!breakdown[inv.country]) {
      breakdown[inv.country] = { country: inv.country, revenue: 0, count: 0 };
    }
    breakdown[inv.country].revenue += inv.totalAmount;
    breakdown[inv.country].count++;
  }

  return Object.values(breakdown).sort((a, b) => b.revenue - a.revenue);
}
