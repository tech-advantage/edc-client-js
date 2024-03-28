import { ContentTypeSuffix } from '../entities/content-type';

export class UrlUtil {

  /**
   * Constructs a file URL by appending an export ID and a file name to a base URL.
   *
   * @param baseUrl The initial base URL string
   * @param fileName The name of the file to be appended to the URL
   * @param exportId The export ID to be appended to the URL
   */
  static getFileUrl(baseUrl: string | null, fileName: string | null, exportId?: string | null): string {
    const exportIdPrefix = exportId ? `${ exportId }/` : '';
    return `${ baseUrl ?? '' }/${ exportIdPrefix }${ fileName }`;
  }

  /**
   * Constructs a content URL by appending an export ID and a content type to a base URL.
   *
   * @param baseUrl The initial base URL string.
   * @param contentType The type of content to be appended to the URL.
   * @param exportId The export ID to be appended to the URL. Can be null.
   */
  static getContentUrl(baseUrl: string, contentType: ContentTypeSuffix, exportId?: string | null): string | null {
    const contentUrl = UrlUtil.appendUrlSection(baseUrl, exportId);
    return UrlUtil.appendUrlSection(contentUrl, contentType);
  }

  /**
   * Concatenates a URL and a section ensuring there is exactly one slash between them.
   *
   * @param url The initial URL string
   * @param section The section to be added to the URL.
   */
  static appendUrlSection(url: string = '', section: string | null = ''): string {
    if (!section) {
      return url;
    }
    // Add one separator at the end of the base url if none
    if (url?.length && !url.endsWith('/')) {
      url += '/';
    }
    // Remove any separator at the beginning of the section
    if (section.startsWith('/')) {
      section = section.slice(1);
    }
    return `${url}${section}` ?? '';
  }
}
