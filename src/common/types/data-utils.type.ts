/* eslint-disable @typescript-eslint/ban-types */
/**
 *  @see https://dev.to/madflanderz/how-to-get-parts-of-an-typescript-interface-3mko
 */
const languages = ["de", "en", "fr", "it"] as const;
// extract type from languages above
type Language = typeof languages[number];

/**
 *  @see https://codyarose.com/blog/object-keys-from-array-in-typescript/
 */
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

type Values = { [K in typeof sizes[number]]: number };

// extract type from languages above
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractComponentProps<
  T extends (params: any) => any,
  U extends keyof Parameters<T>[0]
> = Pick<Parameters<T>[0], U>;

export type ExtractProperty<T extends object, U extends keyof T> = T[U];

/**
 *  Extract props type of subComponent in an Object components
 * @example
 * const components = {
  loading: (modalProps: any) => <span />,
  deleteUser: (modalProps: AdminDeleteUserModalProps) => (
    <AdminDeleteUserModal {...modalProps} />
  )
  @returns will return respectively any and AdminDeleteUserModalProps for loading and deleteUser
};
 */
export type PickObjectComponentParams<
  T extends Record<string, ((...args: any) => any) | (() => any)>,
  U extends keyof T
> = Parameters<ExtractProperty<T, U>> extends never
  ? never
  : Parameters<ExtractProperty<T, U>>["0"];

// ######## Flatten object ###############
// @see https://stackoverflow.com/questions/69095054/how-to-deep-flatten-a-typescript-interface-with-union-types-and-keep-the-full-ob

type Entry = { key: string; value: any; optional: boolean };

type Explode<T> = _Explode<T extends readonly any[] ? { "0": T[number] } : T>;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _Explode<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? Explode<T[K]> extends infer E
          ? E extends Entry
            ? {
                key: `${K}${E["key"] extends "" ? "" : "."}${E["key"]}`;
                value: E["value"];
                optional: E["key"] extends ""
                  ? {} extends Pick<T, K>
                    ? true
                    : false
                  : E["optional"];
              }
            : never
          : never
        : never;
    }[keyof T]
  : { key: ""; value: T; optional: false };

type Collapse<T extends Entry> = {
  [E in Extract<T, { optional: false }> as E["key"]]: E["value"];
} & Partial<{
  [E in Extract<T, { optional: true }> as E["key"]]: E["value"];
}> extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type Flatten<T> = Collapse<Explode<T>>;
