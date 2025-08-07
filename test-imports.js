// Test file to verify mock data imports work correctly
import { mockProducts, inboundOrders, suppliers, warehouses } from './mockdata';

console.log('Testing mock data imports...');
console.log('mockProducts length:', mockProducts.length);
console.log('inboundOrders length:', inboundOrders.length);
console.log('suppliers length:', suppliers.length);
console.log('warehouses length:', warehouses.length);
console.log('First product:', mockProducts[0]);
console.log('All imports working correctly!');