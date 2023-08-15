export default function InfoNavList({styles, services, router, is_column, size}){
  let listClassString= 'relative w-full flex overflow-hidden';
  listClassString += is_column ? ' flex-col' : ' flew-wrap justify-between';
  let lineClassString = 'relative w-full px-4 flex align-items-center';

  switch(size){
    case undefined:
      break;
    case 'lg':
      listClassString += is_column ? ' text-lg font-semibold' : ''
      lineClassString += ' '
      break;
    case 'xl':
      listClassString += is_column ? ['flex flex-col h-full text-xl font-semibold', styles.infoNavListColumn].join(' ') : ''
      lineClassString += ' my-2 max-h-12'
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
    <li className={ lineClassString }>
      <a href="" className="z-10" onClick={ handleClick }>{ service.title }</a>
      <div className="absolute translate-x-neg-2/4 translate-y-neg-2/4 top-2/4 left-2/4 rounded-lg"></div>
    </li>
  );
}