// enhancedAmenityData.ts
export const enhancedAmenityData = [
  {
    id: "1",
    name: "Delhi Police Headquarters",
    type: "police",
    latitude: 28.6315,
    longitude: 77.2167,
    address: "MSO Building, ITO, New Delhi",
    phone: "112",
    rating: 4.5,
    notes: "Central Police HQ, Women Help Desk Available 24/7",
  },
  {
    id: "2",
    name: "AIIMS Delhi",
    type: "hospital",
    latitude: 28.5671,
    longitude: 77.21,
    address: "Ansari Nagar East, New Delhi",
    phone: "011-26588500",
    rating: 4.8,
    notes: "24/7 Emergency Services",
  },
  {
    id: "3",
    name: "Delhi Commission for Women",
    type: "helpCenter",
    latitude: 28.6289,
    longitude: 77.2065,
    address: "C-Block, Vikas Bhawan, IP Estate",
    phone: "181",
    rating: 4.6,
    notes: "Women Safety Support & Counseling",
  },
  {
    id: "4",
    name: "Delhi Metro - Rajiv Chowk",
    type: "transport",
    latitude: 28.6331,
    longitude: 77.2195,
    address: "Rajiv Chowk Metro Station",
    phone: "011-23417910",
    rating: 4.7,
    notes: "Metro Station with Women Security",
  },
  {
    id: "5",
    name: "Sakha Cabs for Women",
    type: "safeCab",
    latitude: 28.628,
    longitude: 77.2184,
    address: "Connaught Place",
    phone: "011-26896689",
    rating: 4.5,
    notes: "Women Driven Cabs Available 24/7",
  },
];

// Delhi boundary coordinates
export const DELHI_BOUNDS = {
  northEast: {
    latitude: 28.88,
    longitude: 77.39,
  },
  southWest: {
    latitude: 28.4,
    longitude: 76.84,
  },
  center: {
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  },
};
