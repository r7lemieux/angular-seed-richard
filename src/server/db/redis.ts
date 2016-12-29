import * as redis from 'redis';

/**
 * Init Names List.
 */
export function Init() {
  console.log('104 init redis');

  let RedisClient = redis.createClient();

  RedisClient.sadd("name-list",
    "Edsger Dijkstra",
    "Donald Knuth",
    "Alan Turing",
    "Grace Hopper",
    redis.print);

  RedisClient.quit();
}
