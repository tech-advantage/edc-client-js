export class Utils {

  static safeGet<T, V>(source: T | null | undefined, properties: string[] | null | undefined): V | null {
    if (!properties || !properties.length || !source) {
      return null;
    }
    let currentSrc: unknown = source;
    properties.forEach((prop: string) => {
      currentSrc = hasOwnProperty(currentSrc, prop) ? currentSrc[prop] : null;
    });
    return currentSrc as V;
  }

}

export const isNil = (value: unknown): value is null | undefined => value === undefined || value === null;

export const removeNils = <T>(arr: Array<T | null | undefined>): T[] => (arr ?? []).filter<T>((item: T | null | undefined): item is T => !isNil(item));

export const hasOwnProperty = <X extends unknown, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);
