import * as SystemJSLoader from "systemjs";

declare var System: SystemJSLoader.System;
System.config(JSON.parse('<%= SYSTEM_CONFIG_DEV %>'));
