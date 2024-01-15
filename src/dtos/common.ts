export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;
export interface AsyncTyped<I, O> {
  (input: I): Promise<O>;
}

export interface Typed<O, I extends any[]> {
  (...args: I): O;
}
