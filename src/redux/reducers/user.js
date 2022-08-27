const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL_TYPE': return { ...state, email: action.email.email };
  default: return state;
  }
};

export default user;
