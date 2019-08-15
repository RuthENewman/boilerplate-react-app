import authReducer from '../../reducers/auth';

test('sets uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: '32546346'
  }
  const state = authReducer({}, action);

  expect(state.uid).toEqual(action.uid);
})

test('clears uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid: 'u84f8en'}, action);
  expect(state).toEqual({});
});
