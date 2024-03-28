import { Promise as PromiseEs6 } from 'es6-promise';
import { Info } from '../entities/info';
import { ContentTypeSuffix } from '../entities/content-type';
import { ExportInfo } from '../entities/export-info';
import { EdcHttpClient } from '../http/edc-http-client';
import { LanguageService } from './language.service';
import { AxiosError } from 'axios';
import { isNil } from '../utils/utils';

/**
 * Handles the documentation export information for every export (plugin) that was found in the root folder
 *
 * Is responsible for :
 *  - reading the multitoc.json file and creating a map of documentation export information for each present plugin with an available info.json file.
 *  - selecting the currently used export
 *  - initializing and updating the language settings for the current export
 *  - providing the title for the current export
 *
 */
export class ExportInfoService {
  private static instance: ExportInfoService;

  // This map holds the collection of all exported products in multidoc.json whose files were found in the root folder
  private infos: Map<string, ExportInfo> = new Map();
  private infosReady: PromiseEs6<Map<string, ExportInfo | null>> | null = null;
  private currentExportId: string | null = null;

  private constructor(private readonly httpClient: EdcHttpClient,
    private readonly translationService: LanguageService) {
  }

  public static getInstance(): ExportInfoService {
    if (!ExportInfoService.instance) {
      ExportInfoService.instance = new ExportInfoService(EdcHttpClient.getInstance(), LanguageService.getInstance());
    }
    return ExportInfoService.instance;
  }

  initInfos(exportId?: string | null, contextOnly?: boolean, lang?: string): PromiseEs6<Map<string, ExportInfo | null>> {
    this.infosReady = this.readMultiToc()
      .then((keys: ExportInfo[]) => PromiseEs6.all(keys.map((exportInfo: ExportInfo) => this.readInfos(exportInfo))))
      .then(() => this.initExportId(exportId, lang))
      .then(() => this.infos);
    return this.infosReady;
  }

  getExportInfoValues(): Map<string, ExportInfo> {
    return this.infos;
  }

  getCurrentExportId(): string | null {
    return this.currentExportId;
  }

  /**
   * Return the title for the current documentation export
   * Will try and get the translation in the current language, if not present it will take default translation's instead
   *
   * If no translation is available at all, it will use the export name attribute
   *
   * Throws an error if export information was not loaded, or no current export information was found
   */
  getTitle(): PromiseEs6<string> {
    if (!this.infosReady) {
      throw new Error('Could not get title: Export information not available');
    }
    return this.infosReady
      .then(() => {
        const currentInfo: Info | null | undefined = this.getCurrentInfo();
        if (!currentInfo) {
          throw new Error('Could not get title: no current Export information');
        }
        if (!this.translationService.getCurrentLanguage()) {
          throw new Error('Current Language is not defined');
        }
        if (!this.translationService.getDefaultLanguage()) {
          throw new Error('Default Language is not defined');
        }
        const currentLang = this.translationService.getCurrentLanguage();
        const defaultLang = this.translationService.getDefaultLanguage();

        // By default use product info name
        let title = currentInfo.name;

        // Try and get translated titles
        const titles = currentInfo.titles;
        if (titles && currentLang) {
          // Use current language if present
          if (titles[currentLang] && titles[currentLang].title) {
            title = titles[currentLang].title;
          } else if (defaultLang && titles[defaultLang] && titles[defaultLang].title) {
            // Else use default language
            title = titles[defaultLang].title;
          }
        }
        return title;
      });
  }

  getCurrentExportInfo(): PromiseEs6<ExportInfo | null | undefined> {
    return (isNil(this.infosReady) ? Promise.reject<string>('No information for current export')
      : this.infosReady.then(() => {
        const currentExportId: string | null = this.getCurrentExportId();
        const exportInfo: ExportInfo | null | undefined = isNil(currentExportId) ? null : this.infos.get(currentExportId);
        if (exportInfo) {
          exportInfo.currentLanguage = this.translationService.getCurrentLanguage();
        }
        return exportInfo;
      })) as PromiseEs6<ExportInfo | null | undefined>;
  }

  /**
   * Read the documentation information for the given export
   *
   * Will fetch the data from the associated info.json file
   *
   * @param exportInfo the export information associated with the information file
   */
  readInfos(exportInfo: ExportInfo): PromiseEs6<Info | null> {
    if (!exportInfo || !exportInfo.pluginId) {
      throw new Error('Export information not valid');
    }
    this.infos.clear();
    return this.httpClient.getContent<Info>(ContentTypeSuffix.TYPE_INFO_SUFFIX, exportInfo.pluginId)
      .then((info: Info | null) => {
        exportInfo.info = this.getInfo(info, exportInfo.pluginId);
        this.infos.set(exportInfo.pluginId, exportInfo);
        return info;
      })
      .catch((err: AxiosError) => {
        // When reading failed, most probably because files were not found, ignore this product
        console.error('Could not read info file', err);
        // Return a resolved promise to go to the next file
        return PromiseEs6.resolve(null);
      });
  }

  /**
   * Set the current documentation export id, and reset language, using the requested one if present
   *
   * Will check if given export is present in the map of export information
   *
   * If new exportId is different from the current export id, will set the new value and reset the whole language properties
   * if it's the same export, or no export was found, it will just try to change the current language if requested language is valid
   *
   * @param exportId the identifier of the documentation export
   * @param requestedLang the language to set
   */
  setCurrentExportId(exportId?: string | null, requestedLang?: string): string | null {
    if (this.doesExportExist(exportId) && exportId !== this.currentExportId) {
      this.currentExportId = exportId ?? null;
      // If it s a new export, reset the language information, trying to conserve the requested language
      this.initLanguages(requestedLang);
    } else if (requestedLang) {
      // No new export, just check and change current language
      this.translationService.setCurrentLanguage(requestedLang);
    }
    return this.getCurrentExportId();
  }

  doesExportExist(exportId: string | null | undefined): boolean {
    return !isNil(exportId) && this.infos.has(exportId) && !!this.infos.get(exportId);
  }

  getInfo(info: Info | null, pluginId: string): Info {
    if (!info || !info.identifier) {
      throw new Error(`Info.json file of plugin ${ pluginId } is not valid`);
    }
    // For old exports: set system language if default language is not defined
    if (!info.defaultLanguage) {
      info.defaultLanguage = LanguageService.SYS_DEFAULT;
      info.languages = [LanguageService.SYS_DEFAULT];
    }
    return info;
  }

  private readMultiToc(): PromiseEs6<ExportInfo[]> {
    return this.httpClient.getContent<ExportInfo[]>(ContentTypeSuffix.TYPE_MULTI_TOC_SUFFIX)
      .then((exportInfos: ExportInfo[] | null) => {
        if (!exportInfos) {
          throw new Error('MultiToc must be defined');
        }
        return exportInfos;
      }).catch((err: Error) => PromiseEs6.reject(new Error('Could not read MultiToc: ' + err)));
  }

  private initExportId(exportId: string | null | undefined, lang?: string): void {
    const exportInfo: ExportInfo | null | undefined = isNil(exportId) ? null : this.infos.get(exportId);
    if (!exportInfo || !exportInfo.info) {
      // If no export was found with this id, take the first available one
      exportId = this.infos.keys().next().value;
    }
    this.setCurrentExportId(exportId, lang);
  }

  private initLanguages(lang?: string): string | null {
    const currentInfo: ExportInfo | null | undefined = isNil(this.currentExportId) ? null : this.infos.get(this.currentExportId);
    if (!currentInfo || !currentInfo.info || !currentInfo.info.defaultLanguage) {
      throw new Error('Could not initialize languages, no info found for the current export');
    }
    return this.translationService.init(currentInfo.info.defaultLanguage, lang, currentInfo.info.languages);
  }

  private getCurrentInfo(): Info | null | undefined {
    let currentInfo: Info | null | undefined;
    const currentExportId = this.getCurrentExportId();
    if (this.infos && !isNil(currentExportId) && this.doesExportExist(currentExportId)) {
      currentInfo = this.infos.get(currentExportId)?.info;
    }
    return currentInfo;
  }

}
