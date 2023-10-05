// Class used as a "narrowing" interface that exposes a minimal logger
// Other members of the actual implementation are invisible
export abstract class MinimalLogger {
    // abstract logs: string[];
    // abstract logInfo: (msg: string) => void;
    abstract logInfo: (msg: string) => void;
    abstract logError: (msg: string) => void;
  }