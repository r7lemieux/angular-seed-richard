/* tslint:disable */
interface GlobalType {jasmineRequire?: {}};
var myGlobal: GlobalType = global;
myGlobal.jasmineRequire = { interface: () => {} };
import 'jasmine-promises';

