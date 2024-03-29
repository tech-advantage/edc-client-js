import { Documentation } from '../entities/documentation';
import { mock } from './test-utils';
import { DocumentationUtil } from './documentation-util';

describe('DocumentationUtil Test', () => {

  describe('generateIndex', () => {
    let tree: Documentation;
    beforeEach(() => {
      tree =
        mock<Documentation>(Documentation, {
          id: 1,
          topics: [
            mock(Documentation, { id: 10 }),
            mock(Documentation, {
              id: 11,
              topics: [
                mock(Documentation, {
                  id: 110,
                  topics: []
                })
              ]
            })
          ]
        });
    });

    it('should create index', () => {
      const index = DocumentationUtil.indexTree([tree], 'toc[0][langCode]', true);

      expect(index).toEqual({
        '1': 'toc[0][langCode]',
        '10': 'toc[0][langCode].topics[0]',
        '11': 'toc[0][langCode].topics[1]',
        '110': 'toc[0][langCode].topics[1].topics[0]'
      });
    });

  });

});
