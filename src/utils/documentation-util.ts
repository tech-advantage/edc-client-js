import { first, get, split } from 'lodash-es';
import { LANGUAGE_CODES } from '../language-codes';
import { MultiToc } from '../entities/multi-toc';
import { InformationMap } from '../entities/information-map';
import { Documentation } from '../entities/documentation';
import { isNil, Utils } from './utils';
import { Indexable } from '../entities/indexable';
import { LanguageService } from '../services/language.service';

export class DocumentationUtil {

  /**
   * Creates a map of paths from the documentations of the given tree following the structure :
   *     key: the identifier of the indexable
   *     value: its path in the multiToc : (example toc[0][langCode].topics[1].topics[0])
   *
   * @param {Indexable[]} indexables : item list of the Tree
   * @param {string} prefix: concatenation of parents id
   * @param {boolean} isRoot: true if indexables is a root (initial function call)
   * @return {{ [key: string]: string }} returns a map with the paths of all documentations of the tree
   */
  static indexTree(indexables: Indexable[] | null | undefined, prefix?: string | undefined, isRoot?: boolean): { [p: string]: string | undefined } {
    if (!indexables) {
      return {};
    }
    // iterate through topics and reduce the documentations concatenating the path with parents
    return indexables.reduce<{ [p: string]: string | undefined }>((memo: { [key: string]: string | undefined }, doc: Indexable, index: number): { [p: string]: string | undefined } => {
      if (!doc) {
        return memo;
      }
      const { id, topics } = doc;
      // Take the prefix as it is if root, else append path to get the children
      const newPrefix = isRoot ? prefix : `${ prefix }.topics[${ index }]`;
      if (!isNil(id)) {
        memo[id] = newPrefix;
      }
      // recall the function with topics until reaching the tree leaf
      return { ...memo, ...DocumentationUtil.indexTree(topics, newPrefix) };
    }, {});
  }

  static findFirstContent<T, G>(source: T): G | null {
    let content: G | null = null;
    for (const langCode of LANGUAGE_CODES) {
      content = Utils.safeGet<T, G>(source, [langCode]);
      if (content) {
        break;
      }
    }
    return content;
  }

  /**
   * Return the information map from the given documentation id
   * Will extract the information map index path from the doc path
   * @param multiToc
   * @param docId
   */
  static findIMFromDocumentationId(multiToc: MultiToc | null, docId: number | null): InformationMap | null {
    let informationMap;
    if (isNil(docId)) {
      return null;
    }
    if (multiToc && multiToc.index && multiToc.exports) {
      const docPath = multiToc.index[docId];
      const iMPath = DocumentationUtil.findIMPathFromDocPath(docPath);
      informationMap = get(multiToc, iMPath);
    }
    if (!informationMap) {
      throw Error(`Could not find informationMap from documentation id : ${ docId }`);
    }
    return informationMap;
  }

  static findDocumentationFromId(multiToc: MultiToc | null, id: number, langCode: string | null, defaultLang?: string | null): Documentation {
    const indexKey = `index[${ id }]`;
    // Get the full documentation path from the index
    const docPath: string = get(multiToc, indexKey);
    // Build the real path, replacing language code with its actual value
    let langDocPath = DocumentationUtil.replaceLanguageCode(docPath, langCode);
    let doc: Documentation = get(multiToc, langDocPath);
    // Retry with default language if doc not found
    if (!doc && defaultLang) {
      langDocPath = DocumentationUtil.replaceLanguageCode(docPath, defaultLang);
      doc = get(multiToc, langDocPath);
    }
    return doc;
  }

  static findPluginIdFromDocumentationId(multiToc: MultiToc | null, docId: number | null): string | null {
    if (isNil(docId)) {
      return null;
    }
    const docPath: string = get(multiToc, `index[${ docId }]`);
    const exportPath = DocumentationUtil.findExportPathFromDocPath(docPath);
    return get(multiToc, exportPath);
  }

  /**
   * Return the export id path from the given documentation index path
   *
   * @param docPath the path of the given documentation in a multiToc index
   */
  static findExportPathFromDocPath(docPath: string): string {
    const rootPath = first(split(docPath, '.'));
    return `${ rootPath }.pluginId`;
  }

  /**
   * Return the information map index path from the given documentation index path
   *
   * @param docPath the path of the documentation in a multiToc index
   * @param langCode the code to use for the path
   */
  static replaceLanguageCode(docPath: string, langCode: string | null): string {
    if (!docPath || !langCode) {
      return '';
    }
    // The information map path is the part of the doc path before the lang selector
    return docPath.replace(LanguageService.LANG_SEPARATOR, `[${ langCode }]`);
  }

  /**
   * Return the information map index path from the given documentation index path
   *
   * @param docPath the path of the documentation in a multiToc index
   */
  static findIMPathFromDocPath(docPath: string): string {
    if (!docPath) {
      throw new Error('Documentation path is not defined, could not extract information map path');
    }
    // The information map path is the part of the doc path before the language separator
    const pathParts: string[] = docPath.split(LanguageService.LANG_SEPARATOR);
    if (!pathParts || pathParts.length !== 2) {
      throw new Error('Documentation path is not valid, could not extract information map path: ' + docPath);
    }
    return pathParts[0];
  }
}
