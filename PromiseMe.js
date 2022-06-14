function PromiseMe(resolver) {
  return new Promise(resolver);
};

PromiseMe.resolve = (value) => Promise.resolve(value);
PromiseMe.reject = (value) => Promise.reject(value);

module.exports = PromiseMe;
