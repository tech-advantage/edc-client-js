import { ContentTypeSuffix } from '../entities/content-type';
import { UrlUtil } from '../utils/url-util';
import { isNil } from '../utils/utils';

export class UrlConfigService {

  static readonly I18N_ROOT_FOLDER = 'i18n';
  static readonly I18N_POPOVER_FOLDER = 'popover';
  static readonly I18N_WEB_HELP_FOLDER = 'web-help';

  private static instance: UrlConfigService;

  private baseURL = '';
  private helpURL = '';
  private i18nURL = '';

  private constructor() {
  }

  public static getInstance(): UrlConfigService {
    if (!UrlConfigService.instance) {
      UrlConfigService.instance = new UrlConfigService();
    }
    return UrlConfigService.instance;
  }

  setURLs(baseURL: string = '', helpURL: string = '', i18nURL: string = ''): void {
    this.baseURL = baseURL ?? '';
    this.helpURL = helpURL ?? '';
    this.i18nURL = i18nURL ?? '';
  }

  getBaseUrl(): string {
    return this.baseURL;
  }

  getHomeUrl(): string {
    return this.helpURL + '/home';
  }

  getErrorUrl(): string {
    return this.helpURL + '/error';
  }

  getContextUrl(publicationId: string | null, mainKey: string | null, subKey: string | null, languageCode: string | null, articleIndex: number | null): string | null {
    if (isNil(publicationId) || isNil(mainKey) || isNil(subKey) || isNil(languageCode) || isNil(articleIndex)) {
      return null;
    }
    return `${ this.helpURL }/context/${ publicationId }/${ mainKey }/${ subKey }/${ languageCode }/${ articleIndex }`;
  }

  getDocumentationUrl(id: number, lang?: string | null, exportId?: string | null): string {
    const exportIdPrefix = exportId ? `${ exportId }/` : '';
    const langSuffix = lang ? `/${ lang }` : '';
    return `${ this.helpURL }/doc/${ exportIdPrefix }${ id }${ langSuffix }`;
  }

  getI18nBaseUrl(): string {
    return this.i18nURL ? this.i18nURL : `${ this.baseURL }/${ UrlConfigService.I18N_ROOT_FOLDER }`;
  }

  getWebHelpI18nUrl(): string {
    return `${ this.getI18nBaseUrl() }/${ UrlConfigService.I18N_WEB_HELP_FOLDER }`;
  }

  getPopoverI18nUrl(): string {
    return `${ this.getI18nBaseUrl() }/${ UrlConfigService.I18N_POPOVER_FOLDER }`;
  }

  getFileUrl(fileUrl: string | null, exportId?: string): string {
    return UrlUtil.getFileUrl(this.getBaseUrl(), fileUrl, exportId);
  }

  getContentUrl(contentType: ContentTypeSuffix, exportId?: string | null): string | null {
    return UrlUtil.getContentUrl(this.getBaseUrl(), contentType, exportId);
  }

  getPopoverLabelsPath(lang: string | null): string | null {
    return lang ? `${ UrlConfigService.I18N_ROOT_FOLDER }/${ UrlConfigService.I18N_POPOVER_FOLDER }/${ lang }.json` : null;
  }
}
