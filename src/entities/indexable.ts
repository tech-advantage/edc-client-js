import { Documentation } from './documentation';

export interface Indexable {
  id: number | null;
  topics?: Documentation[] | null;
}
