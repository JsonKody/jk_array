export const graphs_data = [
  {
    name: { cs: "První graf", en: "First Graph" },
    data: generateRealisticData(),
  },
  {
    name: { cs: "Druhý graf", en: "Second Graph" },
    data: generateRealisticData(),
  },
  {
    name: { cs: "Třetí graf", en: "Third Graph" },
    data: generateRealisticData(),
  },
  // Přidej další grafy podle potřeby
];

function generateRealisticData() {
  const data = [];
  const startDate = new Date("2023-01-01T00:00:00.000Z");
  let previousValue = 50; // Předchozí hodnota, začínáme na střední hodnotě

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Generujeme náhodnou změnu, která je blízká předchozí hodnotě
    const change = Math.random() * 10 - 5;
    const newValue = previousValue + change;

    // Ujistíme se, že hodnota zůstává v rozmezí 0 a 100
    const value = Math.max(0, Math.min(100, newValue));

    data.push([currentDate.toISOString(), value]);
    previousValue = value;
  }

  return data;
}
