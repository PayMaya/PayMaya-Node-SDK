import { expect } from 'chai';
import base64Encode from '../../../src/utils/base64Encode';

export default (): void => {
  describe('base64Encode', () => {
    it('should return a base64 string of the input', () => {
      const input = 'hello';
      const expectedOutput = 'aGVsbG8=';

      const actualOutput = base64Encode(input);

      expect(actualOutput).to.be.eql(expectedOutput);
    });
  });
};
