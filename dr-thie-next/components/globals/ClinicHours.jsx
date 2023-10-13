export default function ClinicHours({ days }){

  const parsedDays = [];

  for (let key in days){
    parsedDays.push(
      <tr key={key}className="font-semibold text-xl">
        <td className="text-xl font-semibold pe-4">{ key }:</td>
        { days[key].is_open && <>
          <td >{ days[key].open }</td>
          <td className="px-4">-</td>
          <td>{ days[key].closed }</td> 
        </> }

        { !days[key].is_open && <>
          <td className="font-bold">Closed</td>
          <td></td>
          <td></td> 
        </> }
      </tr>
    )
  }

  return (
    <table>
      <tbody>
        { parsedDays }
      </tbody>
    </table>
  );
}