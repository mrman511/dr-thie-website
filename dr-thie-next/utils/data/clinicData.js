

export default {
  phone_number: '(519) 472-7090',
  street_address: '390 Commissioners Rd W Suite 101',
  city: 'London',
  region: 'Ontario',
  country: 'Canada',
  postal_code: 'N6J 1Y3',
  hours: {
    Sunday:{
      is_open: false,
    },
    Monday:{
      is_open: true,
      open : '12 pm',
      closed: '7 pm',
    },
    Tuesday:{
      is_open: true,
      open : '8 am',
      closed: '5 pm',
    },
    Wednesday:{
      is_open: true,
      open : '8 am',
      closed: '4 pm',
    },
    Thursday:{
      is_open: true,
      open : '8 am',
      closed: '4 pm',
    },
    Friday:{
      is_open: false,
    },
    Saturday:{
      is_open: false,
    },
  }
};