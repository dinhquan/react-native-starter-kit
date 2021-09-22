import User from 'core/models/user/User';

test('user full name', () => {
  const user = new User();
  user.firstName = 'Quan';
  user.lastName = 'Nguyen';
  expect(user.getFullName()).toBe('Quan Nguyen');
});
