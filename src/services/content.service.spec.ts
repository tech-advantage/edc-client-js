import { ContentService } from './content.service';
import { async, cleanInstances, mockHttpClientGet, mockHttpClientGetContent } from '../utils/test-utils';
import { EdcHttpClient } from '../http/edc-http-client';
import { informationMaps } from '../test/information-maps-stub';
import { ExportInfo } from '../entities/export-info';
import { get } from 'lodash-es';

describe('Content helper test', () => {
  let contentService: ContentService;

  beforeEach(() => {
    contentService = ContentService.getInstance();
  });

  beforeEach(() => {
    spyOn(EdcHttpClient.getInstance(), 'getContent').and.callFake(mockHttpClientGetContent);
    spyOn(EdcHttpClient.getInstance(), 'getFile').and.callFake(mockHttpClientGet(informationMaps));
  });

  afterEach(() => {
    cleanInstances();
  });

  describe('init ContentService', () => {
    let infos: Map<string, ExportInfo>;

    beforeEach(() => {
      infos = contentService.getInfos();
    });

    it('should create Instance', () => {
      expect(contentService).toBeDefined();
    });

    it('should init and select first product', async(() =>
      contentService.initContent().then((exportInfo: ExportInfo | null) => {
        expect(contentService.getContentReady()).toBeDefined();
        expect(exportInfo).toBeDefined();

        expect(infos).toBeDefined();
        expect(infos.get('myProduct1')).toBeDefined();
        expect(get(infos.get('myProduct1'), 'info.defaultLanguage')).toEqual('en');
        expect(contentService.getCurrentPluginId()).toEqual('myProduct1');
      })
    ));

    it('should init with myProduct5', async(() =>
      contentService.initContent('myProduct5').then((exportInfo: ExportInfo | null) => {
        expect(contentService.getContentReady()).toBeDefined();
        expect(exportInfo).toBeDefined();
        expect(infos).toBeDefined();
        expect(infos.get('myProduct5')).toBeDefined();
        expect(get(infos.get('myProduct5'), 'info.defaultLanguage')).toEqual('es');
        expect(contentService.getCurrentPluginId()).toEqual('myProduct5');
      })
    ));
  });

});
