import Cookies = require("cookies");
import Koa = require("koa");

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
/**
 * Session model.
 */
declare interface Session {
  /**
   * JSON representation of the session.
   */
  toJSON(): object;

  /**
   * alias to `toJSON`
   */
  inspect(): object;

  /**
   * Return how many values there are in the session object.
   * Used to see if it"s "populated".
   */
  readonly length: number;

  /**
   * populated flag, which is just a boolean alias of .length.
   */
  readonly populated: boolean;

  /**
   * get/set session maxAge
   */
  maxAge: opts["maxAge"];

  /**
   * save this session no matter whether it is populated
   */
  save(): void;

  /**
   * allow to put any value on session object
   */
  [_: string]: any;
}

declare interface util {
  /**
   * Decode the base64 cookie value to an object.
   */
  decode(str: string): object;

  /**
   * Encode an object into a base64-encoded JSON string.
   */
  encode(obj: object): string;

  hash(sess: any): string;
}

declare interface opts extends Omit<Cookies.SetOption, 'maxAge'> {
  /**
   * cookie key (default is koa:sess)
   */
  key: string;

  /**
   * maxAge in ms (default is 1 days)
   * "session" will result in a cookie that expires when session/browser is closed
   * Warning: If a session cookie is stolen, this cookie will never expire
   */
  maxAge?: number | "session";

  /**
   * custom encode method
   */
  encode: util["encode"];

  /**
   * custom decode method
   */
  decode: util["decode"];

  /**
   * The way of generating external session id is controlled by the options.genid, which defaults to Date.now() + "-" + uid.sync(24).
   */
  genid: () => string;

  /**
   * Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
   */
  rolling?: boolean;

  /**
   * Renew session when session is nearly expired, so we can always keep user logged in. (default is false)
   */
  renew?: boolean;

  /**
   * You can store the session content in external stores(redis, mongodb or other DBs)
   */
  store?: stores;

  /**
   * If your session store requires data or utilities from context, opts.ContextStore is alse supported.
   * ContextStore must be a class which claims three instance methods demonstrated above.
   * new ContextStore(ctx) will be executed on every request.
   */
  ContextStore?: { new(ctx: Koa.Context): stores };

  /**
   * If you want to add prefix for all external session id, you can use options.prefix, it will not work if options.genid present.
   */
  prefix?: string;

  /**
   * Hook: valid session value before use it
   */
  valid?(ctx: Koa.Context, session: Partial<Session>): void;

  /**
   * Hook: before save session
   */
  beforeSave?(ctx: Koa.Context, session: Session): void;
}

declare interface stores {
  /**
   * get session object by key
   */
  get(key: string, maxAge: opts["maxAge"], data: { rolling: opts["rolling"] }): any;

  /**
   * set session object for key, with a maxAge (in ms)
   */
  set(key: string, sess: Partial<Session> & { _expire?: number, _maxAge?: number }, maxAge: opts["maxAge"], data: { changed: boolean; rolling: opts["rolling"] }): any;

  /**
   * destroy session for key
   */
  destroy(key: string): any;
}
