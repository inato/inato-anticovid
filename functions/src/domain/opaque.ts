export type Opaque<K extends string, T> = T & { __TYPE__: K };
