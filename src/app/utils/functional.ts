import _ from "lodash";

// tslint:disable:no-any
type Func = (...args: any[]) => any;

export const compose = <T>(...fns: Func[]) => (x: T) => _.reduceRight(fns, (acc: any, fn) => fn(acc), x);
export const pipe = <T>(...fns: Func[]) => (x: T) => _.reduce(fns, (acc: any, fn) => fn(acc), x);
