export const normalizeArr = arr =>
  arr.reduce((obj, el) => { obj[el.id] = el; return obj }, {})

export const identity = x => x
