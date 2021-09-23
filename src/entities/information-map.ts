import { Documentation } from './documentation';
import { Indexable } from './indexable';
import { Contents } from './contents';

export class InformationMap extends Contents<Documentation> implements Indexable {
  id: number | null = null;
  label?: string | null = '';
  file?: string | null = '';
  topics?: Documentation[] | null = null;
}
