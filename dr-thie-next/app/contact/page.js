import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";

import globalStyles from '../../styles/Globals.module.scss';

import Info from "@/components/contact/Info";

import contactStyles from '../../styles/Contact.module.scss';

import clinicData from "@/utils/data/clinicData";

export const metadata = {
  title: 'Contact - Dr. Ingrid Thie'
}

export default function Contact() {

  return (
    <>
    <Header styles={ globalStyles }/>
    <main className={ [contactStyles.main, 'm-4'].join(' ')}>
      <article className="w-full flex flex-col items-center text-center py-4 px-8">
        <h2 className="mb-4 text-3xl  font-bold">Contact Us</h2>
        <p className="text-lg font-semibold">
          Feel free to reach out to us for any inquiries, appointments, or concerns. Our dedicated team is here to assist you. Whether you're a new patient or a returning one, we're committed to providing you with top-notch dental care and exceptional service.
        </p>
      </article>
      <Info styles={ contactStyles } clinicData={ clinicData }/>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}