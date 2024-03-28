import { UrlUtil } from './url-util';
import { ContentTypeSuffix } from '../entities/content-type';

describe('url util', () => {
  describe('getFileUrl', () => {
    it('should return the file url', () => {
      const fileUrl = UrlUtil.getFileUrl('http://localhost/doc', 'my-file.json');
      expect(fileUrl).toEqual('http://localhost/doc/my-file.json');
    });
    it('should return the file url with export prefix', () => {
      const fileUrl = UrlUtil.getFileUrl('http://localhost/doc', 'my-file.json', 'myExport1');
      expect(fileUrl).toEqual('http://localhost/doc/myExport1/my-file.json');
    });
  });

  describe('test getContentUrl', () => {
    it('should return the content url using all sections', () => {
      expect(UrlUtil.getContentUrl('http://abc.com/doc', ContentTypeSuffix.TYPE_CONTEXT_SUFFIX, 'myDoc2')).toEqual('http://abc.com/doc/myDoc2/context.json');
      expect(UrlUtil.getContentUrl('http://abc.com/doc', ContentTypeSuffix.TYPE_MULTI_TOC_SUFFIX, 'myDoc23')).toEqual('http://abc.com/doc/myDoc23/multi-doc.json');
      expect(UrlUtil.getContentUrl('http://abc.com/doc', ContentTypeSuffix.TYPE_INFO_SUFFIX, 'myDoc23')).toEqual('http://abc.com/doc/myDoc23/info.json');
    });
    it('should handle repeated slashes', () => {
      expect(UrlUtil.getContentUrl('http://abc.com/doc/', ContentTypeSuffix.TYPE_MULTI_TOC_SUFFIX, '/myDoc/')).toEqual('http://abc.com/doc/myDoc/multi-doc.json');
    });
    it('should handle empty values', () => {
      expect(UrlUtil.getContentUrl('http://abc.com/doc', ContentTypeSuffix.TYPE_CONTEXT_SUFFIX, '')).toEqual('http://abc.com/doc/context.json');
      expect(UrlUtil.getContentUrl('abc.com/doc', ContentTypeSuffix.TYPE_MULTI_TOC_SUFFIX)).toEqual('abc.com/doc/multi-doc.json');
      expect(UrlUtil.getContentUrl('', ContentTypeSuffix.TYPE_INFO_SUFFIX, 'myDoc23')).toEqual('myDoc23/info.json');
      expect(UrlUtil.getContentUrl('/', ContentTypeSuffix.TYPE_INFO_SUFFIX, 'myDoc23')).toEqual('/myDoc23/info.json');
    });
  });

  describe('Test appendUrlSection', () => {
    it('should add a section to a URL without a slash at the end', () => {
      const url = 'http://example.com';
      const section = 'test';
      const result = UrlUtil.appendUrlSection(url, section);
      expect(result).toEqual('http://example.com/test');
    });

    it('should add a section to a URL with a slash at the end', () => {
      const url = 'http://example.com/';
      const section = 'test';
      const result = UrlUtil.appendUrlSection(url, section);
      expect(result).toEqual('http://example.com/test');
    });

    it('should add a section with a slash at the end to a URL without a slash at the end', () => {
      const url = 'http://example.com';
      const section = '/test';
      const result = UrlUtil.appendUrlSection(url, section);
      expect(result).toEqual('http://example.com/test');
    });

    it('should add a section with a slash at the end to a URL with a slash at the end', () => {
      const url = 'http://example.com/';
      const section = '/test';
      const result = UrlUtil.appendUrlSection(url, section);
      expect(result).toEqual('http://example.com/test');
    });

    it('should handle empty values', () => {
      expect(UrlUtil.appendUrlSection(undefined, '/test')).toEqual('test');
      expect(UrlUtil.appendUrlSection('root', undefined)).toEqual('root');
      expect(UrlUtil.appendUrlSection('http://example.com', undefined)).toEqual('http://example.com');
      expect(UrlUtil.appendUrlSection(undefined, undefined)).toEqual('');
    });
  });
});
