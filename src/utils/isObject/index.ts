const isObject = (x: unknown) => {
  return typeof x === "object" && !Array.isArray(x) && x !== null;
};

export default isObject;
