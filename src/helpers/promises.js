exports.promiseAll = (arrToPromise, promisify) => {
  const promises = [];
  for (let i = 0; i < arrToPromise.length; i++) {
    promises.push(promisify(arrToPromise[i]));
  }
  return Promise.all(promises);
};
