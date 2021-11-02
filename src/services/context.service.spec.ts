import { ContextService } from './context.service';
import { EdcHttpClient } from '../http/edc-http-client';
import { mockHttpClientGetContent, async, cleanInstances } from '../utils/test-utils';
import { ContextualHelp } from '../entities/contextual-help';

describe('ContextService Test', () => {
  let service: ContextService;

  beforeEach(() => {
    service = ContextService.getInstance();
  });

  beforeEach(() => {
    spyOn(EdcHttpClient.getInstance(), 'getContent').and.callFake(mockHttpClientGetContent);
  });

  afterEach(() => {
    cleanInstances();
  });

  describe('initialization', () => {

    it('should create service', () => {
      expect(service).toBeDefined();
    });

    it('should initialize contextual help', async(() =>
      service.initContext('product1').then((context: ContextualHelp | null) => {
        expect(context).toBeDefined();
      })
    ));
  });

});
