declare module 'skulpt' {
  const Sk: {
    configure: (options: Record<string, unknown>) => void;
    importMainWithBody: (name: string, dumpJS: boolean, body: string, canSuspend?: boolean) => unknown;
    misceval: {
      asyncToPromise: (fn: () => unknown) => Promise<unknown>;
    };
    builtinFiles?: { files: Record<string, string> };
    python3?: unknown;
  };
  export default Sk;
}
