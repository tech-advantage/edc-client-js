import { Toc } from './toc';

export class DocumentationExport {

  constructor(public pluginId: string,
    public productId: number,
    public toc: Toc | null = new Toc(),
    public defaultLanguage?: string,
    public languages?: string[]) {
  }
}
