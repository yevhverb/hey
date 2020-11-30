const handlers = {
  roomCreate: require('./roomCreate'),
  roomCheck: require('./roomCheck'),
  roomJoin: require('./roomJoin'),
  roomLeave: require('./roomLeave'),
  roomUserUpdate: require('./roomUserUpdate'),
};

module.exports = (context) => {
  return Object.entries(handlers).reduce(
    (handlers, [key, handler]) => ({
      ...handlers,
      [key]: (...args) => handler(context, ...args),
    }),
    {}
  );
};
