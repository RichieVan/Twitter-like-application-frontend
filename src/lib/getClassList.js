function getClassList(baseClass, mods = []) {
  const classArray = [baseClass];
  const classList = classArray.concat(
    mods.map((mod) => `${baseClass}_${mod}`),
  ).join(' ');

  return classList;
}

export default getClassList;
