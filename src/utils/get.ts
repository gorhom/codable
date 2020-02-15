// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
// @ts-ignore
export const get = (obj, path, defaultValue) => {
  // @ts-ignore
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      // @ts-ignore
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};
