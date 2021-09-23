import { Helper } from '../entities/helper';
import { ContextualHelp } from '../entities/contextual-help';
import { ContentTypeSuffix } from '../entities/content-type';
import { Promise as PromiseEs6 } from 'es6-promise';
import { ExportInfo } from '../entities/export-info';
import { firstInfo, secondInfo, thirdInfo } from '../test/myFirstProduct/info';
import { Info } from '../entities/info';
import { firstProductToc, secondProductToc, thirdProductToc } from '../test/stub-tocs';
import { BaseToc } from '../entities/toc';
import { Article } from '../entities/article';
import { ExportInfoService } from '../services/export-info.service';
import { ContentService } from '../services/content.service';
import { ContextService } from '../services/context.service';
import { DocumentationService } from '../services/documentation.service';
import { LanguageService } from '../services/language.service';
import { UrlConfigService } from '../services/url-config.service';
import { EdcHttpClient } from '../http/edc-http-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mock<T>(type: new(...args: any[]) => T, objet: Partial<T>): T {
  const entity: T = new type();
  return { ...entity, ...objet } as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function async(fn: any): (d: () => void) => void {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
  return function (done: () => void) {
    const result = fn();
    result.then(() => {
      done();
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const mockHttpClientGetContent = (suffix: ContentTypeSuffix, exportId?: string): PromiseEs6<any> => {
  const productKeys = [
    new ExportInfo('myProduct1', 1),
    new ExportInfo('myProduct3', 3),
    new ExportInfo('myProduct5', 5),
    new ExportInfo('myProduct8', 8)
  ];
  const mockedInfos = [
    firstInfo,
    secondInfo,
    thirdInfo
  ];
  const mockedTocs: BaseToc[] = [
    firstProductToc,
    secondProductToc,
    thirdProductToc
  ];
  let response: PromiseEs6<string | ExportInfo[] | Info | ContextualHelp | BaseToc | null>;
  switch (suffix) {
    case ContentTypeSuffix.TYPE_MULTI_TOC_SUFFIX: {
      response = PromiseEs6.resolve(productKeys);
      break;
    }
    case ContentTypeSuffix.TYPE_INFO_SUFFIX: {
      const info: Info = mockedInfos.find((currentInfo: Info) => exportId === currentInfo.identifier);
      response = info ? PromiseEs6.resolve(info) : PromiseEs6.reject('Info not Found');
      break;
    }
    case ContentTypeSuffix.TYPE_CONTEXT_SUFFIX:
      response = PromiseEs6.resolve(mock(ContextualHelp, {
        'mainKey': {
          'subKey': {
            'en': mock(Helper, {
              'description': 'fake context',
              'articles': [
                mock(Article, {
                  'label': 'abc',
                  'url': 'def'
                })
              ]
            })
          }
        }
      }));
      break;
    case ContentTypeSuffix.TYPE_TOC_SUFFIX: {
      const foundToc: BaseToc | undefined = mockedTocs.find((toc: BaseToc) => toc && toc.label === exportId);
      response = foundToc ? PromiseEs6.resolve(foundToc) : PromiseEs6.reject('Toc not found for export :' + exportId);
      break;
    }
    default: {
      response = PromiseEs6.resolve(null);
      break;
    }
  }
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const mockHttpClientGet = <T>(informationMaps: Map<string, T>) => (url: string | null, exportId?: string): PromiseEs6<any> => {
  const entry: [string, T] | undefined = Array.from(informationMaps.entries())
    .find(([key, ]) => url && url.includes(key));

  return entry && entry.length > 1 ? PromiseEs6.resolve(entry[1]) : PromiseEs6.resolve(null);
};

export const cleanInstances = (): void => {
  const instances = [
    ContentService,
    ContextService,
    DocumentationService,
    ExportInfoService,
    LanguageService,
    UrlConfigService,
    EdcHttpClient
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instances.forEach((inst: any) => {
    if (inst && Object.prototype.hasOwnProperty.call(inst, 'instance')) {
      inst['instance'] = undefined;
    }
  });
};
