/* eslint-disable no-unused-expressions */
const Redis = require("ioredis");
const config = require("../config/config");

let redis;

const classRedis = {
  init: () => {
    if (!redis) {
      redis = new Redis(config.REDIS);
    }
  },
  get: token => {
    classRedis.init();
    return redis.get(token);
  },
  set: (token, value) => {
    classRedis.init();
    let dados = value;

    return new Promise((resolve, reject) => {
      if (typeof dados === "object") {
        dados = JSON.stringify(dados);
      }
      redis.set(token, dados, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  },
  setExpire: (token, value, expire) => {
    classRedis.init();
    let dados = value;
    const ex = expire || 86400;
    return new Promise((resolve, reject) => {
      if (typeof dados === "object") {
        dados = JSON.stringify(dados);
      }
      redis.set(token, dados, "EX", ex, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  },
  del: token => {
    redis.del(token);
  }
};

module.exports = classRedis;
