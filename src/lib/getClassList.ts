function getClassList(baseClass: string, mods: string[] = []): string {
  const classArray = [baseClass];
  const classList = classArray.concat(
    mods.map((mod: string) => `${baseClass}_${mod}`),
  ).join(' ');

  return classList;
}

export default getClassList;
