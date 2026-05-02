export type UnitStatus = "Available" | "Sold";

export type UnitRecord = {
  id: string;
  title: string;
  roomType: "1 BEDROOM" | "2 BEDROOM" | "3 BEDROOM";
  status: UnitStatus;
  price: string;
  size: string;
  areaSqm: number;
  floorRange: string;
  completion: string;
  features: string[];
  transferTax: string;
  finalPrice: string;
};

export const unitRecords: UnitRecord[] = [
  {
    id: "u-101",
    title: "Unit 101",
    roomType: "1 BEDROOM",
    status: "Available",
    price: "120,000",
    size: "55 m²",
    areaSqm: 55,
    floorRange: "3-5",
    completion: "2027",
    features: ["City view", "Smart lock", "Balcony"],
    transferTax: "$1,200",
    finalPrice: "$121,200",
  },
  {
    id: "u-205",
    title: "Unit 205",
    roomType: "2 BEDROOM",
    status: "Available",
    price: "180,000",
    size: "78 m²",
    areaSqm: 78,
    floorRange: "6-9",
    completion: "2027",
    features: ["Corner unit", "2 bathrooms", "Balcony"],
    transferTax: "$1,800",
    finalPrice: "$181,800",
  },
  {
    id: "u-310",
    title: "Unit 310",
    roomType: "3 BEDROOM",
    status: "Sold",
    price: "260,000",
    size: "110 m²",
    areaSqm: 110,
    floorRange: "10-12",
    completion: "2027",
    features: ["Panoramic view", "Private lift", "Large balcony"],
    transferTax: "$2,600",
    finalPrice: "$262,600",
  }
];

export async function getUnitById(id: string): Promise<UnitRecord | null> {
  return unitRecords.find((u) => u.id === id) ?? null;
}

