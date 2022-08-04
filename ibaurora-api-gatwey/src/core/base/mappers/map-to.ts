export abstract class MapTo<I, O> {
  abstract mapTo(param: I): O;
}
