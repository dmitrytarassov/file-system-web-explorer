export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;
export interface AsyncTyped<I, O> {
  (input: I): Promise<O>;
}
