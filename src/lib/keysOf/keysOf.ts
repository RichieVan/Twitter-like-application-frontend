const keysOf = <T extends Object, K extends keyof T>(obj: T): K[] => {
  const keys = Object.keys(obj);
  return keys as any;
};
export default keysOf;
