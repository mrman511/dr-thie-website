import Header from '@/components/globals/Header';
import Blurb from '@/components/globals/Blurb';
import Footer from '@/components/globals/Footer';
import globalStyles from '@/styles/Globals.module.scss';

import { aboutUsBlurb, staffBlurb } from '@/utils/data/blurbs';

import Employee from "@/components/about/Employee";
import aboutStyles from '@/styles/About.module.scss'

import { employees } from '@/utils/data/employees';

export const metadata = {
  title: 'About Us - Dr. Ingrid Thie'
}

export default function About() {

  const parsedDentists = employees.map(employee => {
    if (employee.position === 'Dentist'){
      return(<Employee styles={ aboutStyles } employee={ employee } isDentist={ true }/>)
    }
  })
  const parsedEmployees = employees.map(employee => {
    if (employee.position !== 'Dentist'){
      console.log('HERE')
      return(<Employee styles={ aboutStyles } employee={ employee } isDentist={ false }/>)
    }
  })

  return (
    <>
    <Header styles={ globalStyles }/>
    <main className='flex flex-col'>
      <Blurb styles={ globalStyles } info={ aboutUsBlurb }/>
      <section className={ [aboutStyles.DentistList, "w-6/6 flex flex-col"].join(' ') }>
        { parsedDentists }
      </section>
      <Blurb styles={ globalStyles } info={ staffBlurb } alt={ true }/>
      <section className={ [aboutStyles.staffList, "w-6/6 flex flex-wrap justify-center"].join(' ') }>
        { parsedEmployees }
      </section>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}