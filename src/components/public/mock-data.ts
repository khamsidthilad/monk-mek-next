export const heroStats = [
  { label: "Active Projects", value: "12+" },
  { label: "Units Available", value: "340" },
  { label: "Avg. ROI", value: "11.8%" },
] as const;

export const projectMocks = [
  {
    id: "p1",
    name: "ICON Riverside Villas",
    location: "Vientiane Riverside",
    status: "Now Selling",
    priceFrom: "$180,000",
  },
  {
    id: "p2",
    name: "ICON Sky Residences",
    location: "Sisattanak District",
    status: "Pre-launch",
    priceFrom: "$145,000",
  },
  {
    id: "p3",
    name: "ICON Heritage Suites",
    location: "Luang Prabang",
    status: "Ready to Move",
    priceFrom: "$210,000",
  },
] as const;

export const unitMocks = [
  { id: "u1", type: "Studio", area: "38 sqm", price: "$95,000", tag: "Best Value" },
  { id: "u2", type: "1 Bedroom", area: "52 sqm", price: "$128,000", tag: "Most Popular" },
  { id: "u3", type: "2 Bedroom", area: "78 sqm", price: "$179,000", tag: "Family Pick" },
  { id: "u4", type: "Penthouse", area: "145 sqm", price: "$420,000", tag: "Luxury" },
] as const;

export const galleryMocks = [
  "Skyline Living Room",
  "Infinity Pool Deck",
  "Private Rooftop Lounge",
  "Signature Lobby",
  "Masterplan View",
  "Show Unit Interior",
] as const;
