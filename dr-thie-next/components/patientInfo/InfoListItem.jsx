export default function InfoListItem({ info }){

  return (
    <li className="my-4 ms-8">
      { info.heading && <span className=" text-xl sm:text-2xl font-semibold me-4">{ info.heading }:</span>}
      { info.text }
    </li>
  );
}