export function listofTags(objList){
  const tags = [];
  for (let obj of objList){
    for (let tag of obj.tags){
      if (!tags.includes(tag)){
        tags.push(tag);
      }
    }
  }
  return tags.length > 0 ? tags : false
}

export function objsWithTag(tag, objList){
  const objs = [];
  for (let obj of objList){
    // console.log(tag);
    // console.log(obj.tags.includes(tag));
    if (obj.tags.includes(tag)){
      objs.push(obj);
    }
  }
  return objs.length > 0 ? objs : false
}