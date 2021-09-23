import { ContentTypeSuffix } from '../entities/content-type';

export class UrlUtil {

  static getFileUrl(baseUrl: string | null, fileName: string | null, exportId?: string | null): string {
    const exportIdPrefix = exportId ? `${ exportId }/` : '';
    return `${ baseUrl ?? '' }/${ exportIdPrefix }${ fileName }`;
  }

  static getContentUrl(baseUrl: string, contentType: ContentTypeSuffix, exportId?: string | null): string | null {
    const exportIdPrefix = exportId ? `${ exportId }` : '';
    const typeSuffix = contentType ? `${ contentType }` : '';

    return `${ baseUrl }/${ exportIdPrefix }${ typeSuffix }`;
  }
}
