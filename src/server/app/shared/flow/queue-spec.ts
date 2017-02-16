import {Queue} from './d3Queue';

describe('id service', () => {
  console.log(`=> queue-spec:06 `);

  const results:{[key: string]: number} = {};

  const factory = (check: string): any => {
    console.log(`=> queue-spec:10 `);

    return (err: any, callback: () => void): void => {
       if (!results[check]) {
         results[check] = 0;
       }
       results[check]++;
       callback();
       console.log(`=> queue-spec:18 results ${JSON.stringify(results)}`);
     };
  };

  it('queue and callback ', (done) => {
    console.log(`=> queue-spec:19 `);
    const q:Queue = new Queue();

    console.log(`=> queue-spec:21 `);
    q.defer(factory('aa'));
    console.log(`=> queue-spec:24 `);

    q.await(() => {
      console.log(`=> queue-spec:27 `);
      expect(results['aa']).toBe(1);
      done();
    })

  });
});
