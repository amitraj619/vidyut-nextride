/**
 * Test data and fixtures for Vidyut NextRide automation suite
 */

export const TEST_DATA = {
  cities: {
    bengaluru: 'Bengaluru',
    delhi: 'Delhi',
    hyderabad: 'Hyderabad',
  },
  routes: {
    home: '/',
    listing: '/all-ev-vehicles',
    buyUsedEv: '/buy-used-ev',
    sellUsedEv: '/sell-used-ev',
    quiz: '/find-my-perfect-ev',
  },
  expectedTitles: {
    home: /Vidyut NextRide|Used Electric Auto/i,
  },
  vehicleTypes: {
    cargo: 'CARGO',
    passenger: 'PASSENGER',
  },
  sortOptions: {
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    newlyAdded: 'Newly Added',
  },
  sampleCustomer: {
    name: 'Rahul Sharma',
    phone: '9876543210',
    city: 'Bengaluru',
    pinCode: '560001',
  },
  contact: {
    supportPhone: '+91 709 000 1401',
    supportEmail: 'support@vidyuttech.com',
  },
};
