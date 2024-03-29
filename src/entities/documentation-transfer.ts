import { Documentation } from './documentation';

export class DocumentationTransfer {
  constructor(public doc: Documentation | null, // The requested documentation object
    public exportId: string | null, // Identifier of the resolved export containing the requested documentation
    public hasExportChanged: boolean, // True if requested documentation didn't belong to the previously set current export
    public resolvedLanguage: string | null // The language that was finally selected for the requested documentation content
  ) {
  }
}
