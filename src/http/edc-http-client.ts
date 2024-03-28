import { get } from 'lodash-es';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Promise } from 'es6-promise';
import { ContentTypeSuffix } from '../entities/content-type';
import { UrlConfigService } from '../services/url-config.service';
import { Loadable } from '../entities/loadable';

export class EdcHttpClient {

  private static instance: EdcHttpClient;

  private constructor(private readonly urlConfigService: UrlConfigService) {}

  public static getInstance(): EdcHttpClient {
    if (!EdcHttpClient.instance) {
      EdcHttpClient.instance = new EdcHttpClient(UrlConfigService.getInstance());
    }
    return EdcHttpClient.instance;
  }

  getFile<T>(fileName: string | null, exportId?: string): Promise<T | null> {
    const url = this.urlConfigService.getFileUrl(fileName, exportId);
    if (!url) {
      return Promise.reject('Invalid url');
    }
    return axios.get<T>(url)
      .then((res: AxiosResponse) => get(res, 'status') === 200 ? res.data : null,
        (err: AxiosError) => Promise.reject(err)) as Promise<T | null>;
  }

  getContent<T>(suffix: ContentTypeSuffix, exportId?: string | null): Promise<T | null> {
    const url = this.urlConfigService.getContentUrl(suffix, exportId);
    if (!url) {
      return Promise.reject('Invalid url');
    }
    return axios.get<T>(url)
      .then((res: AxiosResponse) => get(res, 'status') === 200 ? res.data : null,
        (err: AxiosError) => Promise.reject(err)) as Promise<T | null>;
  }

  getItemContent<T extends Loadable>(item: T): Promise<T | null> {
    if (!item) {
      return Promise.reject('Cannot get content, url is not defined');
    }
    if (!item.url) {
      return Promise.resolve(item);
    }
    return this.getFile<string>(item.url)
      .then((content: string | null) => {
        item.content = content;
        return item;
      }, (): T | null => null)
      .catch((): T | null => null);
  }
}
