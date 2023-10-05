import { Injectable, InjectionToken } from "@angular/core";

// // Other members of the actual implementation are invisible
// export abstract class AbstractBridgeService {
//   abstract getHelpIndex(): {};
// }

// @Injectable()
// export class BridgeService extends AbstractBridgeService{
//   getHelpIndex() {
//     console.log ("in lib BridgeService getHelpIndex()")
//     return {};
//   }

// }


/** Token to inject the bridge service */
export const BRIDGE_SERVICE_ADAPTER:
    InjectionToken<BridgeServiceAdapter> =
        new InjectionToken<BridgeServiceAdapter>('Bridge service token');

export interface BridgeServiceAdapter {
  hello(): void;
  getHelpIndex();
}