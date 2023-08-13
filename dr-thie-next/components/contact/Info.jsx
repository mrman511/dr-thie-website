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
          <h5 className="text-xl">{ `${ clinicData.street_address }, ${ clinicData.city }, ${ clinicData.region }, ${ clinicData.postal_code } ` }</h5>
        </div>
      </section>
      <section className="w-full flex flex-wrap justify-evenly items-center mx-4 min-h-fit">
        <div className="h-60">
          <ClinicHours days={ clinicData.hours }/>
        </div>
        <div className="w-full h-80 md:w-7/12">
          <Map clinicData={ clinicData }/>
        </div>
      </section>
    </article>
  );
}