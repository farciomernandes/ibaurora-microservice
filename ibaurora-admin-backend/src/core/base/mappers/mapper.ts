import { MapFrom } from './map-from';
import { MapTo } from './map-to';

export interface Mapper<I, O> extends MapTo<O, I>, MapFrom<I, O> {}
