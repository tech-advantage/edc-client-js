import { get } from 'lodash-es';
import { DocumentationService } from './documentation.service';
import { ExportInfo } from '../entities/export-info';
import { async, cleanInstances, mock, mockHttpClientGet, mockHttpClientGetContent } from '../utils/test-utils';
import { Info } from '../entities/info';
import { EdcHttpClient } from '../http/edc-http-client';
import { informationMap1, informationMap11, informationMap3, informationMap4, informationMap7, informationMaps } from '../test/information-maps-stub';
import { DocumentationExport } from '../entities/documentation-export';
import { Toc } from '../entities/toc';
import { Documentation } from '../entities/documentation';
import { InformationMap } from '../entities/information-map';

describe('DocumentationService test', () => {

  let service: DocumentationService;
  let httpClient: EdcHttpClient;

  // Data
  let productInfo1: ExportInfo;
  let productInfo2: ExportInfo;
  let productInfo3: ExportInfo;
  const productInfos: Map<string, ExportInfo> = new Map();

  beforeEach(() => {
    cleanInstances();
  });

  beforeEach(() => {
    service = DocumentationService.getInstance();
    httpClient = EdcHttpClient.getInstance();
  });

  beforeEach(() => {
    productInfo1 = mock(ExportInfo, {
      productId: 1,
      info: mock(Info, {
        defaultLanguage: 'en'
      })
    });
    productInfo2 = mock(ExportInfo, {
      productId: 3,
      info: mock(Info, {
        defaultLanguage: 'fr'
      })
    });
    productInfo3 = mock(ExportInfo, {
      productId: 5,
      info: mock(Info, {
        defaultLanguage: 'ru'
      })
    });
    productInfos.clear();
    productInfos.set('myProduct1', productInfo1);
    productInfos.set('myProduct3', productInfo2);
    productInfos.set('myProduct5', productInfo3);
  });

  beforeEach(() => {
    spyOn(httpClient, 'getContent').and.callFake(mockHttpClientGetContent);
    spyOn(httpClient, 'getFile').and.callFake(mockHttpClientGet(informationMaps));
  });

  describe('init', () => {
    it('should create instance', () => {
      expect(service).toBeDefined();
    });
    it('should create be singleton', () => {
      expect(DocumentationService.getInstance()).toBe(service);
    });
  });

  describe('readTocs', () => {
    it('should read tocs', async(() =>
      service.readTocs(productInfos).then((docExports: DocumentationExport[]) => {
        expect(docExports).toBeDefined();
        expect(docExports.length).toEqual(3);
        const toc1 = get(docExports[0], 'toc.toc');
        const toc2 = get(docExports[1], 'toc.toc');
        const toc3 = get(docExports[2], 'toc.toc');
        expect(toc1.length).toEqual(3);
        expect(toc1[0]).toEqual(informationMap1);
        expect(toc1[1]).toEqual(informationMap3);
        expect(toc1[2]).toEqual(informationMap4);
        expect(toc2.length).toEqual(1);
        expect(toc2[0]).toEqual(informationMap7);
        expect(toc3.length).toEqual(1);
        expect(toc3[0]).toEqual(informationMap11);
      })
    ));
  });

  describe('createIndex', () => {
    let docExport: DocumentationExport;
    let docExport2: DocumentationExport;
    let docExports: DocumentationExport[];
    beforeEach(() => {
      docExport = mock(DocumentationExport, {
        pluginId: 'myProduct1',
        toc: mock(Toc, { label: 'myProduct1', toc: [informationMap1, informationMap4, informationMap1] })
      });
      docExport2 = mock(DocumentationExport, {
        pluginId: 'myProduct2',
        toc: mock(Toc, { label: 'myProduct2', toc: [informationMap7] })
      });
      docExports = [docExport, docExport2];
    });
    it('should generate index', () => {
      const index = service.createIndex(docExports);
      expect(index).toBeDefined();
    });
  });

  describe('createIndexOfExport', () => {
    let docExport: DocumentationExport;
    beforeEach(() => {
      docExport = mock(DocumentationExport, {
        pluginId: 'myProduct1',
        toc: mock(Toc, { label: 'myProduct1', toc: [informationMap1, informationMap4, informationMap1] })
      });
    });
    it('should generate index', () => {
      const index = service.createIndexOfExport(docExport, 0);
      expect(index).toBeDefined();
    });
  });

  describe('Runtime', () => {
    beforeEach(() => {
      service.initMultiToc(productInfos);
    });

    describe('getDocumentation', () => {
      it('should return the right documentation in the right language', async(() =>
        service.getDocumentation(41, 'fr')
          .then((documentation: Documentation | null) => {
            expect(documentation).toBeDefined();
            if (documentation) {
              expect(documentation.id).toEqual(41);
              expect(documentation.label).toEqual('document 41 in french');
              expect(documentation.topics).toBeDefined();
            }
          })
      ));

      it('should return the right documentation in the default language', async(() =>
        service.getDocumentation(41, 'ru', 'en')
          .then((documentation: Documentation | null) => {
            expect(documentation).toBeDefined();
            if (documentation) {
              expect(documentation.id).toEqual(41);
              expect(documentation.label).toEqual('document 41 in english');
              expect(documentation.topics).toBeDefined();
            }
          })
      ));
    });

    describe('findPluginIdFromDocumentationId', () => {
      it('should return the right plugin id', async(() =>
        service.findPluginIdFromDocumentationId(100).then(pluginId => {
          expect(pluginId).toEqual('myProduct5');
        })
      ));
      it('should return null if doc id is not defined', async(() =>
        service.findPluginIdFromDocumentationId(null).then(pluginId => {
          expect(pluginId).toBeNull();
        })
      ));
    });

    describe('getInformationMapFromDocId', () => {
      it('should return the right plugin id', () => {
        service.getInformationMapFromDocId(100).then((informationMap: InformationMap | null) => {
          expect(informationMap).toBeDefined();
          if (informationMap) {
            expect(informationMap.id).toEqual(11);
          }
        });
      });
      it('should return null if doc id is not defined', async(() =>
        service.getInformationMapFromDocId(null).then((informationMap: InformationMap | null) => {
          expect(informationMap).toBeNull();
        })
      ));
    });

  });

});
