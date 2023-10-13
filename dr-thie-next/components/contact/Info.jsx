import Link from "next/link";
import ClinicHours from "../globals/ClinicHours";
import Map from "../globals/Map";

export default function Info({ styles, clinicData }){

  const {phone_number, street_address, city, region, postal_code, hours} = clinicData 

  return (
    <article className="w-full flex flex-col items-center my-4">
      <section className="w-full flex flex-wrap justify-center mx-4">
        <div className="min-w-fit my-8 flex flex-col px-8">
          <h3 className="text-2xl font-semibold">Give us a call</h3>
          <h5 className="text-xl">Phone Number: <Link href={`tel:${phone_number}`}>{ phone_number }</Link></h5>
        </div>
        <div className="my-8 flex flex-col px-8">
          <h3 className="text-2xl font-semibold">Or see us in person</h3>
          <h5 className="text-xl">{ `${ street_address },` }</h5>
          <h5 className="text-xl">{ ` ${ city }, ${ region }` }</h5>
          <h5 className="text-xl">{ `${ postal_code }` }</h5>
        </div>
      </section>
      <section className={ [styles.locationCard, "w-full flex flex-wrap-reverse justify-evenly items-center py-4 px-2 min-h-fit "].join(' ') }>
        <div className="w-full h-[450px] md:w-7/12 rounded-md overflow-hidden">
          <Map clinicData={ clinicData }/>
        </div>
        <div>
          <ClinicHours days={ hours }/>
        </div>
      </section>
    </article>
  );
}