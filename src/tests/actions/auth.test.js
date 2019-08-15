import { login, logout } from '../../actions/auth';

test('generates login action object', () => {
  const uid = '8973rcse0'
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: uid
  });
});

test('generates logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
