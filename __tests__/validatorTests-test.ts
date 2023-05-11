import * as Validators from '../src/utils/validators';
describe('Validator tests', () => {
  it('should test invalid email', () => {
    const invalidEmail = Validators.validateEmail('crew.plain.com');
    expect(invalidEmail).toBe(false);
  });
  it('should test valid email', () => {
    const validEmail = Validators.validateEmail('crew@plain.com');
    expect(validEmail).toBe(true);
  });
});
