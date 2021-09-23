import { InformationMap } from './information-map';

export class Toc {
  label: string | null;
  toc: InformationMap[] | null;

  constructor(label?: string | null, toc?: InformationMap[] | null) {
    this.label = label ?? '';
    this.toc = toc ?? [];
  }
}

export class BaseToc {
  label: string | null = '';
  toc: TocInfo[] | null = null;
}

export class TocInfo {
  id: string | null = '';
  file: string | null = '';
}
