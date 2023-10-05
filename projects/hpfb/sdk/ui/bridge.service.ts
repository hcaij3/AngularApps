import { Injectable } from "@angular/core";

// Other members of the actual implementation are invisible
export abstract class AbstractBridgeService {
  abstract getHelpIndex(): {};
}

@Injectable()
export class BridgeService extends AbstractBridgeService{
  getHelpIndex() {
    console.log ("in lib BridgeService getHelpIndex()")
    return {};
  }

}
