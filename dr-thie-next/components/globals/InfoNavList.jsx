export default function InfoNavList({styles, services, router, is_column, size}){
  let listClassString= 'relative w-full flex overflow-hidden';
  listClassString += is_column ? ' flex-col' : ' flew-wrap justify-between';
  let lineClassString = 'relative w-full flex align-items-center';

  switch(size){
    case undefined:
      break;
    case 'lg':
      listClassString += is_column ? ' text-lg font-semibold' : ''
      lineClassString += ' '
      break;
    case 'xl':
      listClassString += is_column ? ['flex flex-col text-xl font-semibold', styles.infoNavListColumn].join(' ') : ''
      lineClassString += ' py-1 '
      break;   
  }

  return (
    <ul className={ listClassString }>
      { services.map(service => <InfoLink key={ `${ service.id }-query` } service={service} router={ router } lineClassString={ lineClassString }/>) }
    </ul>
  );
}

function InfoLink({service, router, lineClassString}){
  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/information?service=${service.id}`)
  }

  return (
    <li className="relative">
      <a href="" onClick={ handleClick } className={ [lineClassString, "w-full h-auto px-4 z-10"].join(' ') }>{ service.title }</a>
      <div className="absolute translate-x-neg-2/4 translate-y-neg-2/4 top-2/4 left-2/4 rounded-lg"></div>
    </li>
  );
}