export default function ContactLinkBar({ styles }){

  return (
    <div className={ [styles.contactLinkBar, "sm:text-lg font-semibold w-full h-16 flex justify-center items-center text-center"].join(' ')}>
      Need to book an appointment? Click Here!
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 3 } stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}