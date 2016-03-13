
// Check that an object is a Rx Observable.
export const isObservable = (o) => (typeof o === 'object' && typeof o.subscribeOnNext === 'function')

// Emulates array.map for an object.
export const objectMap = (object, mapper) => {
  const returnObject = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (mapper(key, value)) returnObject[key] = value
  })
  return returnObject
}
