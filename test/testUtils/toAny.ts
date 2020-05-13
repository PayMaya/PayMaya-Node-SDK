/**
 * Utility function to cast an object to "any" type.
 * Used to expose private class methods during testing.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (object: unknown): any => object as any;
