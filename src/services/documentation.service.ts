import { MultiToc } from '../entities/multi-toc';
import { Promise, Promise as PromiseEs6 } from 'es6-promise';
import { ExportInfo } from '../entities/export-info';
import { DocumentationExport } from '../entities/documentation-export';
import { BaseToc, Toc, TocInfo } from '../entities/toc';
import { EdcHttpClient } from '../http/edc-http-client';
import { ContentTypeSuffix } from '../entities/content-type';
import { InformationMap } from '../entities/information-map';
import { isNil, removeNils, Utils } from '../utils/utils';
import { Documentation } from '../entities/documentation';
import { DocumentationUtil } from '../utils/documentation-util';
import { LanguageService } from './language.service';

/**
 * Service for handling operations on documentations
 *
 * At initialization, it will read all the table of contents for every present export
 * and store them into the MultiToc.
 * Creates an index of the multiToc, for fetching any element from its id
 *
 */
export class DocumentationService {
  private static instance: DocumentationService;
  private static TOC_NOT_DEFINED_MSG = 'TOC is not defined';

  private globalToc: MultiToc | null = null;
  private globalTocReady: PromiseEs6<MultiToc | null> | null = null;

  private constructor(private readonly httpClient: EdcHttpClient) {
  }

  public static getInstance(): DocumentationService {
    if (!DocumentationService.instance) {
      DocumentationService.instance = new DocumentationService(EdcHttpClient.getInstance());
    }
    return DocumentationService.instance;
  }

  initMultiToc(exportInfos: Map<string, ExportInfo>): PromiseEs6<MultiToc | null> {
    this.globalToc = null;
    this.globalTocReady = this.readTocs(exportInfos)
      .then((documentationExports: DocumentationExport[]) => PromiseEs6.resolve(this.createMultiToc(documentationExports)))
      .then((multiToc: MultiToc | null) => PromiseEs6.resolve(this.globalToc = multiToc))
      .then(() => PromiseEs6.resolve(this.globalToc));
    return this.globalTocReady;
  }

  getDocumentation(id: number, langCode: string | null, defaultLang?: string | null): PromiseEs6<Documentation | null> {
    return (this.globalTocReady ?? Promise.reject('TOC not defined'))
      .then((multiToc: MultiToc | null) => DocumentationUtil.findDocumentationFromId(multiToc, id, langCode, defaultLang))
      .then((doc: Documentation) => this.httpClient.getItemContent<Documentation>(doc));
  }

  findPluginIdFromDocumentationId(docId: number | null): PromiseEs6<string | null> {
    return isNil(this.globalTocReady) ? Promise.reject(DocumentationService.TOC_NOT_DEFINED_MSG) :
      this.globalTocReady.then(() => DocumentationUtil.findPluginIdFromDocumentationId(this.globalToc, docId));
  }

  getInformationMapFromDocId(id: number | null): PromiseEs6<InformationMap | null> {
    return isNil(this.globalTocReady) ? Promise.reject(DocumentationService.TOC_NOT_DEFINED_MSG) :
      this.globalTocReady.then(() => DocumentationUtil.findIMFromDocumentationId(this.globalToc, id));
  }

  getToc(pluginId: string | null): PromiseEs6<Toc | null> {
    return isNil(this.globalTocReady) ? Promise.reject(DocumentationService.TOC_NOT_DEFINED_MSG) :
      this.globalTocReady.then(() => {
        const docExport = (isNil(this.globalToc) || !this.globalToc.exports) ? null :
          this.globalToc.exports.find((documentationExport: DocumentationExport) => documentationExport.pluginId === pluginId);
        return docExport ? Utils.safeGet<DocumentationExport, Toc>(docExport, ['toc']) : null;
      });
  }

  readTocs(productInfos: Map<string, ExportInfo>): PromiseEs6<DocumentationExport[]> {
    if (!productInfos || !productInfos.size) {
      return PromiseEs6.resolve([]);
    }

    return PromiseEs6.all(
      Array.from(productInfos.entries(),
        ([exportId, exportInfo]: [string, ExportInfo]) => this.readSingleToc(exportId, exportInfo)
      )
    ).then((docExports: (DocumentationExport | null)[]) => docExports ? docExports.filter(Boolean) as DocumentationExport[] : []);
  }

  createIndex(documentationExports: DocumentationExport[]): { [key: string]: string } {
    return documentationExports.reduce((memo: { [key: string]: string }, docExport: DocumentationExport, index: number) => {
      const partialIndex = this.createIndexOfExport(docExport, index);
      if (partialIndex) {
        Object.assign(memo, partialIndex);
      }
      return memo;
    }, {});
  }

  createIndexOfExport(docExport: DocumentationExport, index: number): { [key: string]: string } | null {
    if (!docExport || !docExport.toc || !docExport.toc.toc || !docExport.toc.toc.length) {
      console.warn('Could not create index for documentation export: ', docExport);
      return null;
    }
    const informationMaps: InformationMap[] = docExport.toc.toc;
    // Reduce the informationMaps into the key index
    return informationMaps.reduce((indexTree: { [key: string]: string }, im: InformationMap, imIndex: number) => {
      // All languages of the information map contents have the same tree structure, use the first available one for indexation
      const rootTopics: Documentation | null = DocumentationUtil.findFirstContent<InformationMap, Documentation>(im);
      if (!rootTopics) {
        console.error('No content found for the information map', im);
        return indexTree;
      }
      // We found some content, we can add it to the index tree
      // Specify the root prefix - here LANG_SEPARATOR is an anchor, meant to be replaced by a real language code during content retrieving
      const rootPrefix = `exports[${ index }].toc.toc[${ imIndex }]${ LanguageService.LANG_SEPARATOR }`;
      // Add the partial index corresponding to this information map to the export index tree
      Object.assign(indexTree, DocumentationUtil.indexTree([rootTopics], rootPrefix, true));
      return indexTree;
    }, {});
  }

  private readSingleToc(exportId: string, exportInfo: ExportInfo): PromiseEs6<DocumentationExport | null> {
    return this.httpClient.getContent<BaseToc>(ContentTypeSuffix.TYPE_TOC_SUFFIX, exportId)
      .then((toc: BaseToc | null) => this.readInformationMaps(exportId, toc))
      .then((toc: Toc | null) => new DocumentationExport(
        exportId,
        exportInfo.productId,
        toc,
        exportInfo.info?.defaultLanguage,
        exportInfo.info?.languages ?? []
      )).catch((err: Error) => {
        console.warn('Could not find table of contents for export : {}, {}', exportId, err);
        return PromiseEs6.resolve(null);
      });
  }

  private readInformationMaps(exportId: string, toc: BaseToc | null): PromiseEs6<Toc | null> {
    return PromiseEs6.all((toc?.toc ?? [])
      .map((tocInfo: TocInfo) => this.httpClient.getFile<InformationMap>(tocInfo.file, exportId)))
      .then(removeNils)
      .then((ims: InformationMap[]) => new Toc(toc?.label, ims))
      .catch(err => {
        console.error('Could not get toc ', toc, err);
        return PromiseEs6.resolve(null);
      });
  }

  private createMultiToc(documentationExports: DocumentationExport[]): MultiToc | null {
    if (!documentationExports || !documentationExports.length) {
      return null;
    }
    const index = this.createIndex(documentationExports);
    return new MultiToc(documentationExports, index);
  }
}
