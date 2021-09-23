import {SignInCredential} from 'core/network/services/userService';
import {signIn, userSelector} from 'core/redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';

function useUserScreen(credential: SignInCredential) {
  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(signIn(credential));
  };

  const {data: user} = useSelector(userSelector);

  return {
    user: user,
    hasSignedIn: user !== undefined,
    onSignIn,
  };
}

export default useUserScreen;
