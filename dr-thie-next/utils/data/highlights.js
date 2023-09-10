export const highlights = [
  {
    id: 'about us',
    route: 'about',
    subtext: 'Your Dental Team',
    title: 'Meet Our Dentist',
    text: 'Our dentists are highly skilled professionals, dedicated to providing top-notch dental care to our patients.',
    link: {
      title: 'Learn More',
      path: '',
    },
    image: {
      title: 'Our Team',
      path: 'team.jpg',
    }
  },

  {
    id: 'preventive',
    route: 'services',
    subtext: 'Prevent and Restore',
    title: 'Cleanings and Exams',
    text: 'Long term oral health starts with regular dental exams and cleanings at our office.',
    link: {
      title: 'Learn More',
      path: '',
    },
    image: {
      title: 'Preventative Care',
      path: 'preventative.jpeg',
    }
  },

  {
    id: 'cosmetic',
    route: 'services',
    subtext: 'Smile Brightly',
    title: 'Cosmetic Treatments',
    text: 'Enhance smiles and boost confidence, with teeth whitening, veneers and Invisalign.',
    link: {
      title: 'Learn More',
      path: '',
    },
    image: {
      title: 'Cosmetic Treatments',
      path: 'cosmetic.jpeg',
    }
  },

  {
    id: 'new_patient',
    route: 'contact',
    subtext: 'Need a dentist?',
    title: 'New Patients Welcome',
    text: 'Discover the art of enhancing smiles and achieving the confidence you deserve.',
    link: {
      title: 'Contact Us',
      path: '',
    },
    image: {
      title: 'New Patients Welcome',
      path: 'new-patients.jpeg',
    }
  },
];

export const serviceHighlights = [
  {
    id: 'restorative',
    title: 'Restorative Dental Care',
    icon: 'restorative.svg',
  },
  {
    id: 'crowns_veneers',
    title: 'Crowns and Veneers',
    icon: 'crown.svg',
  },
  {
    id: (Math.floor(Math.random() * 2) ? 'bruxism' : 'sports' ),
    title: 'Sports and Bruxism Gaurds',
    icon: 'guard.svg',
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    icon: 'whitening.svg',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    icon: 'invisalign.svg',
  },
]