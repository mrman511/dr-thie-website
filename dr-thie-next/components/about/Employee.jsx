import Image from "next/image";

export default function Employee({ styles, employee, isDentist }){

  const gridClass = isDentist ? styles.dentist : styles.employee;

  const containerSize = isDentist ? 'w-6/6 py-4' : 'h-48 w-32 lg:h-48 lg:w-32 py-2';
  const imageSize = isDentist ? 'h-48 w-48 md:h-60 md:w-60' : 'h-24 w-24 lg:h-32 lg:w-32';

  const profileImage = require(`@/public/images/employees/${employee.profile_image}`);
  

  return (
    <article className={ [gridClass, containerSize, 'relative'].join(' ')}>
      <div className={[styles.imageContainer , `relative ${ imageSize } w-auto mx-auto justify-self-center self-center rounded-full overflow-hidden`].join(' ')}>
        <Image src={ profileImage } 
          alt={ employee.name }
          style={{objectFit: "cover"}}
          fill={ true }
          priority={ true }
          sizes='(max-width: 600px) 66vw, (max-width: 768) 50vw, 33vw'
          />
      </div>
      <div className={ [styles.name, "absolute flex flex-col"].join(' ')}>
        <h3 className="text-lg font-bold">{ employee.name }</h3>
        <h4 className="text-lg">{ employee.position }</h4>
      </div>
      {isDentist && <div className={ styles.bio, "relative flex flex-col px-12 my-4"}>
        <p>{ employee.short_bio }</p>
      </div>}
    </article>
  );
}