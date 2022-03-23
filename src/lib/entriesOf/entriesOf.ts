const entriesOf = <T extends Object, K extends keyof T>(obj: T): [K, T[K]][] => {
  const entries = Object.entries(obj);
  return entries as any;
};
export default entriesOf;
