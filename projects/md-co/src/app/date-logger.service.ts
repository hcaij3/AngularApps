import { Injectable } from "@angular/core";
import { LoggerService } from "@hpfb/sdk/ui";
import { MinimalLogger } from "@hpfb/sdk/ui/minimal-logger.service";

@Injectable()
export class DateLoggerService extends LoggerService implements MinimalLogger
{
  logError(msg: string)  { super.error("***", stamp(msg)); }

  logInfo(msg: any)  { super.log("xxx", stamp(msg)); }
  // logDebug(msg: any) { super.logInfo(stamp(msg)); }
  // logError(msg: any) { super.logError(stamp(msg)); }
}

function stamp(msg: any) { return msg + ' at ' + new Date(); }