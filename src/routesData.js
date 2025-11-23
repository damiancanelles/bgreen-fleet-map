// src/routesData.js

// Example coordinates (Atlanta area)
export const trucks = [
  {
    id: 'T1',
    name: 'Truck 1 – West Route',
    color: '#ff4d4d',
    route: [
      { lat: 33.7488, lng: -84.3877 }, // Downtown
      { lat: 33.755, lng: -84.4 },
      { lat: 33.762, lng: -84.42 },
    ],
  },
  {
    id: 'T2',
    name: 'Truck 2 – East Route',
    color: '#4d9bff',
    route: [
      { lat: 33.7488, lng: -84.3877 },
      { lat: 33.743, lng: -84.36 },
      { lat: 33.738, lng: -84.34 },
    ],
  },
  {
    id: 'T3',
    name: 'Truck 3 – North Route',
    color: '#40c76a',
    route: [
      { lat: 33.7488, lng: -84.3877 },
      { lat: 33.76, lng: -84.38 },
      { lat: 33.78, lng: -84.38 },
    ],
  },
];
