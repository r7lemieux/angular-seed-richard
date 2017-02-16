
// type Callback = (err:Object, res:() => void) => void;
type Callback = (err: Object, result: any) => void;
type Task = Callback[];

export class Queue {

  public size: number;
  public call: (err: Object, result: Object) => void;
  public error: Object;
  public tasks: (Task)[];
  public waiting: number;
  public active: number;
  public ended: number;
  public started: boolean;
  public data: any[];


  constructor(size: number = 1) {
    if (!(size >= 1)) throw new Error;
    this.size = size;
    this.error = null;
    this.tasks = [];
    this.data = [];
    this.waiting = 0;
    this.active = 0;
    this.ended = 0;
    this.started = false;
  }

  public defer(callback: Callback) {
    console.log(`=> queue:34 arguments ${JSON.stringify(arguments)}`);
    console.log(`=> queue:34 arguments ${(arguments)}`);
    console.log(`=> queue:35 callback ${(callback)}`);
    if (typeof callback !== "function" || this.call) throw new Error;
    console.log(`=> queue:29 `);
    if (this.error != null) return this;

    const t = Array.prototype.slice.call(arguments, 1);
    console.log(`=> queue:40 t ${JSON.stringify(t)}`);
    t.push(callback);
    console.log(`=> queue:40 t ${JSON.stringify(t)}`);
    ++this.waiting;
    this.tasks.push(t);
    console.log(`=> queue:37 this.tasks ${JSON.stringify(this.tasks)}`);
    this.poke();
    return this;
  }

 public  await(callback: () => void) {
    console.log('=> queue:47 typeof ' + typeof callback);
    console.log('=> queue:48 this.call ' + this.call);
    if (typeof callback !== "function" || this.call) throw new Error;
    console.log('=> queue:58 callback ' + callback);
    this.call = function (error, results) {
      console.log(`=> queue:50 error ${JSON.stringify(error)}`);
      console.log(`=> queue:51 results ${JSON.stringify(results)}`);
      callback.apply(null, [error].concat(results));
    };
    console.log('=> queue:64 this.call ' + this.call);

    this.maybeNotify();
    return this;
  }

  public awaitAll(callback: Callback) {
    if (typeof callback !== "function" || this.call) throw new Error;
    this.call = callback;
    this.maybeNotify();
    return this;
  }

  public abort(e: Object) {
    var i = this.tasks.length, t: Task;
    this.error = e? e: new Error('abort'); // ignore active callbacks
    this.data = undefined; // allow gc
    this.waiting = NaN; // prevent starting
    console.log(`=> queue:121 abort this.tasks ${JSON.stringify(this.tasks)}`);
    while (--i >= 0) {
      const t: any = this.tasks[i];
      if (t) {
        this.tasks[i] = null;
        if (t.abort) {
          try {
            t.abort();
          }
          catch (e) { /* ignore */
          }
        }
      }
    }
    this.active = NaN; // allow notification
    this.maybeNotify();
    return this;
  }

  protected maybeNotify() {
    console.log(`=> queue:76 this.active ${JSON.stringify(this.active)}`);
    console.log(`=> queue:77 this.call ${(this.call)}`);
    if (!this.active && this.call) {
      var d = this.data;
      console.log(`=> queue:141 this.data ${JSON.stringify(this.data)}`);
      this.data = undefined; // allow gc
      this.call(this.error, d);
    }
  }

  protected poke() {
    if (!this.started) {
      try {
        this.start();
      } // let the current task complete
      catch (e) {
        if (this.tasks[this.ended + this.active - 1]) this.abort(e); // task errored synchronously
        else if (!this.data) throw e; // await callback errored synchronously
      }
    }
  }

  protected start() {
    console.log(`=> queue:73 waiting:${this.waiting} active:${this.active} size:${this.size}`);
    while (this.started = this.waiting && this.active < this.size) {
      console.log(`=> queue:75 this.tasks ${this.tasks} `);
      let i = this.ended + this.active,
        t = this.tasks[i],
        j = t.length - 1,
        c = t[j];
      t[j] = this.end(i);
      --this.waiting;
      ++this.active;
      console.log(`=> queue:112 t ${JSON.stringify(t)}`);
      console.log(`=> queue:114 c ${JSON.stringify(c)}`);
      t = c.apply(null, t);
      console.log(`=> queue:115 t ${JSON.stringify(t)}`);
      if (!this.tasks[i]) {  // task finished synchronously
        console.log(`=> queue:116 this.tasks[${i}] ${JSON.stringify(this.tasks[i])}`);
        continue;
      }
      this.tasks[i] = t || [];
    }
  }

  protected end(i: number) {
    return (e: Object, r: any) => {
      console.log('=> queue:99 this.tasks[' + i + ']' + this.tasks[i]);
      if (!this.tasks[i]) return; // ignore multiple callbacks
      console.log('=> queue:101 this.active' + this.active);
      --this.active;
      ++this.ended;
      console.log('=> queue:102 this.active' + this.active);
      this.tasks[i] = null;
      if (this.error != null) return; // ignore secondary errors
      if (e != null) {
        this.abort(e);
      } else {
        this.data[i] = r;
        if (this.waiting) this.poke();
        else this.maybeNotify();
      }
    };
  }

}

export default function queue(concurrency: number = 1) {
  return new Queue(arguments.length ? +concurrency : Infinity);
}
