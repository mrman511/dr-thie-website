import ClinicHours from "../globals/ClinicHours";
import Map from "../globals/Map";

export default function Info({ styles, clinicData }){
  return (
    <article className="w-full flex flex-col items-center my-4">
      <section className="w-full flex flex-wrap justify-center mx-4">
        <div className="min-w-fit my-8 flex flex-col px-8">
          <h3 className="text-2xl font-semibold">Give us a call</h3>
          <h5 className="text-xl">Phone Number: <span>{ clinicData.phone_number }</span></h5>
        </div>
        <div className="my-8 flex flex-col px-8">
          <h3 className="text-2xl font-semibold">Or see us in person</h3>
          <h5 className="text-xl">{ `${ clinicData.street_address },` }</h5>
          <h5 className="text-xl">{ ` ${ clinicData.city }, ${ clinicData.region }` }</h5>
          <h5 className="text-xl">{ `${ clinicData.postal_code }` }</h5>
        </div>
      </section>
      <section className={ [styles.locationCard, "w-full flex flex-wrap-reverse justify-evenly items-center py-4 px-2 min-h-fit "].join(' ') }>
        <div className="w-full h-[500px] md:w-7/12 lg:w-4/6 xl:w-9/12 rounded-md overflow-hidden">
          <Map clinicData={ clinicData }/>
        </div>
        <div className="h-60">
          <ClinicHours days={ clinicData.hours }/>
        </div>
      </section>
    </article>
  );
}