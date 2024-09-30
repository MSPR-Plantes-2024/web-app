import { Jwt } from '../jwt';

describe('JdkToken', () => {
  it('should create an instance', () => {
    expect(new Jwt()).toBeTruthy();
  });
});
