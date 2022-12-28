exports.promiseAll = (arrToPromise, promisify) => {
  let promises = [];
  for (let i = 0; i < arrToPromise.length; i++) {
    promises.push(promisify(arrToPromise[i]));
  }
  return Promise.all(promises);
};
