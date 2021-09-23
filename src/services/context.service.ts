import { ContentTypeSuffix } from '../entities/content-type';
import { Promise, Promise as PromiseEs6 } from 'es6-promise';
import { EdcHttpClient } from '../http/edc-http-client';
import { Helper } from '../entities/helper';
import { ContextualHelp } from '../entities/contextual-help';
import { Utils } from '../utils/utils';
import { ContextualExport } from '../entities/contextual-export';
import { Article } from '../entities/article';
import { PopoverLabel } from '../entities/popover-label';
import { UrlConfigService } from './url-config.service';
import { PopoverError } from '../entities/popover-error';

/**
 * For reading and returning the documentation context content
 *
 * This content is requested by the popovers, and the web explorer when called from a brick's article
 */
export class ContextService {
  private static instance: ContextService;
  context: ContextualExport | null = null;
  contextReady: PromiseEs6<ContextualHelp | null> | null = null;

  private constructor(private readonly httpClient: EdcHttpClient) {
  }

  public static getInstance(): ContextService {
    if (!ContextService.instance) {
      ContextService.instance = new ContextService(EdcHttpClient.getInstance());
    }
    return ContextService.instance;
  }

  initContext(pluginId: string | null): PromiseEs6<ContextualHelp | null> {
    if (!this.context || (pluginId && this.context.pluginId !== pluginId)) {
      this.contextReady = this.readContext(pluginId)
        .then((context: ContextualExport) => {
          this.context = context;
          return context.contextualHelp;
        })
        .catch(err => {
          console.warn(`Edc-client-js : could not get context from plugin [${ pluginId }]: ${ err }`);
          return PromiseEs6.resolve(null);
        });
    }
    return this.contextReady ?? Promise.resolve(null);
  }

  /**
   * return the contextual Help from the export "context" file
   * if the pluginId defining the export is not defined, use current export or the export by default
   * @param {string} pluginId the identifier of the plugin associated with the export
   * @return {Promise<any>} the
   */
  readContext(pluginId: string | null): PromiseEs6<ContextualExport> {
    return this.httpClient.getContent<ContextualHelp>(ContentTypeSuffix.TYPE_CONTEXT_SUFFIX, pluginId)
      .then((contextualHelp: ContextualHelp) => new ContextualExport(pluginId, contextualHelp));
  }

  getContext(mainKey: string, subKey: string, pluginId: string | null, lang?: string | null): PromiseEs6<Helper | null> {
    return this.initContext(pluginId).then(() => {
      if (!this.context || !this.context.contextualHelp) {
        return null;
      }
      const props: string[] = [mainKey, subKey];
      if (lang) {
        props.push(lang);
      }
      const helper: Helper | null = Utils.safeGet<ContextualHelp, Helper>(this.context.contextualHelp, props);
      if (!helper) {
        return null;
      }
      helper.language = lang;
      helper.exportId = pluginId;
      return PromiseEs6.all(
        [this.httpClient.getItemContent<Helper>(helper),
          ...(helper.articles ?? []).filter(Boolean).map((article: Article) => this.httpClient.getItemContent<Article>(article).then(() => helper))
        ]
      )
        .then(() => helper)
        .catch(() => null);
    });
  }

  getPopoverLabel(langCode: string | null, pluginId: string | null, url: UrlConfigService): PromiseEs6<PopoverLabel | null> {
    return this.initContext(pluginId).then(() => {
      // To make sure that context is initialized and usable
      if (!this.context || !this.context.contextualHelp) {
        return null;
      }

      const labels: PopoverLabel = new PopoverLabel();
      labels.url = url.getPopoverLabelsPath(langCode);
      return this.httpClient.getItemContent<PopoverLabel>(labels)
        .then((label: PopoverLabel | null) => {
          if (!label) {
            return PromiseEs6.reject('Can\'t fetch popover labels !');
          }

          const tmpLabel = Utils.safeGet<unknown, string>(label.content, ['labels']);
          const tmpError = Utils.safeGet<unknown, string>(label.content, ['errors']);
          if (tmpLabel && tmpError) {
            label.articles = Utils.safeGet<unknown, string>(tmpLabel, ['articles']);
            label.links = Utils.safeGet<unknown, string>(tmpLabel, ['links']);
            label.iconAlt = Utils.safeGet<unknown, string>(tmpLabel, ['iconAlt']);
            label.comingSoon = Utils.safeGet<unknown, string>(tmpLabel, ['comingSoon']);
            label.errorTitle = Utils.safeGet<unknown, string>(tmpLabel, ['errorTitle']);

            const errorLabels = new PopoverError();
            errorLabels.failedData = Utils.safeGet<unknown, string>(tmpError, ['failedData']);

            label.errors = errorLabels;

            return label;
          }

          return PromiseEs6.reject('Can\'t find required data in fetched popover labels !');
        });
    });
  }
}
