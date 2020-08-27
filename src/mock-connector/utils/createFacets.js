import colors from './colors'
import capitalize from 'lodash/capitalize'

export default function createFacets() {
  return [
    {
      name: 'Price per pound',
      ui: 'minMax',
      options: [],
    },
    {
      name: 'Discount',
      ui: 'range',
      min: 0,
      max: 100,
      step: 1,
      options: [],
    },
    {
      name: 'Type',
      ui: 'checkboxes',
      options: [
        { name: 'Fixed Price', code: 'type:fixed-price', matches: 32 },
        { name: 'Auction with buy now', code: 'type:auction-buy-now', matches: 203 },
        { name: 'Auction without buy now', code: 'type:auction-without-buy-now', matches: 23 },
      ],
    },
    {
      name: 'Manufacturer',
      ui: 'checkboxes',
      options: [
        { name: 'Manufacturer 1', code: 'type:manufacturer1', matches: 100 },
        { name: 'Manufacturer 2', code: 'type:manufacturer2', matches: 20 },
        { name: 'Manufacturer 3', code: 'type:manufacturer3', matches: 20 },
        { name: 'Manufacturer 4', code: 'type:manufacturer4', matches: 20 },
      ],
    },
    {
      name: 'Certification',
      ui: 'checkboxes',
      options: [
        { name: 'Organic', code: 'type:organic', matches: 100 },
        { name: 'Gluten-free', code: 'type:gluten-free', matches: 20 },
        { name: 'No GMO', code: 'type:no-gmo', matches: 20 },
        { name: 'Kosher', code: 'type:kosher', matches: 20 },
        { name: 'Halal', code: 'type:halal', matches: 20 },
        { name: 'Fair Trade', code: 'type:fair-trade', matches: 20 },
      ],
    },
    {
      name: 'Delivery time (Aproximate)',
      ui: 'checkboxes',
      options: [
        { name: 'Immediate', code: 'type:inmediate', matches: 100 },
        { name: '2-3 days', code: 'type:23days', matches: 20 },
        { name: '1 week', code: 'type:1week', matches: 20 },
        { name: '2 weeks', code: 'type:2weeks', matches: 20 },
        { name: '1 month', code: 'type:1month', matches: 20 },
      ],
    },
    {
      name: 'Origin',
      ui: 'checkboxes',
      options: [
        { name: 'Argentina', code: 'type:argentina', matches: 100 },
        { name: 'Mexico', code: 'type:mexico', matches: 20 },
        { name: 'Spain', code: 'type:spain', matches: 20 },
        { name: 'United States', code: 'type:usa', matches: 20 },
        { name: 'Vietnam', code: 'type:vietnam', matches: 20 },
      ],
    },
    {
      name: 'Shipping method',
      ui: 'checkboxes',
      options: [
        { name: 'Truck', code: 'type:truck', matches: 100 },
        { name: 'Air', code: 'type:air', matches: 20 },
        { name: 'Ship', code: 'type:ship', matches: 20 },
      ],
    },
  ]
}
