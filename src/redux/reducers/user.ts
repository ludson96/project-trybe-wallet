import { UserState } from '../../types/wallet';
import { EMAIL_TYPE, WalletActionTypes } from '../actions/index';

const INITIAL_STATE: UserState = {
  email: localStorage.getItem('financetrack_user_email') || '',
};

const user = (state = INITIAL_STATE, action: WalletActionTypes): UserState => {
  switch (action.type) {
    case EMAIL_TYPE:
      localStorage.setItem('financetrack_user_email', action.payload);
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
