import { useAuthenticatedUser } from 'hooks/api/useUser';
import { useCallback, useMemo, useState } from 'react';
import { User } from 'types/User';
import { pause } from 'utils/time';
import {
  validate,
  required,
  minLength,
  maxLength,
  alphanumericUnderscoresPeriods,
  noConsecutivePeriodsOrUnderscores,
} from 'utils/validators';

import { BIO_MAX_CHAR_COUNT } from './UserInfoForm';

type Props = {
  onSuccess: () => void;
  existingUsername?: string;
  existingBio?: string;
};

export default function useUserInfoForm({
  onSuccess,
  existingUsername,
  existingBio,
}: Props) {
  const [username, setUsername] = useState(existingUsername || '');
  const [usernameError, setUsernameError] = useState('');

  const [bio, setBio] = useState(existingBio || '');

  // generic error that doesn't belong to username / bio
  const [generalError, setGeneralError] = useState('');

  const handleCreateUser = useCallback(async () => {
    setGeneralError('');

    //-------------- client-side checks --------------
    const usernameError = validate(username, [
      required,
      minLength(2),
      maxLength(20),
      alphanumericUnderscoresPeriods,
      noConsecutivePeriodsOrUnderscores,
    ]);

    if (usernameError) {
      setUsernameError(usernameError);
      return;
    }

    if (bio.length > BIO_MAX_CHAR_COUNT) {
      // no need to handle error here, since the form will mark the text as red
      return;
    }
    //------------ end client-side checks ------------

    // TODO__v1: send request to server to UPDATE user's username and bio.
    // it should be an UPDATE because a user entity will have already been
    // created by this step
    try {
      if (username === 'username_taken') {
        await pause(700);
        throw { type: 'ERR_USERNAME_TAKEN' };
      }
      if (username === 'server_error') {
        await pause(700);
        throw { type: 'ERR_SOMETHING_GENERIC' };
      }

      await pause(1000);
      onSuccess();
    } catch (e) {
      // set error message in different locations based on error type
      if (e.type === 'ERR_USERNAME_TAKEN') {
        setUsernameError('This username is already taken. Please try another.');
        return;
      }
      setGeneralError(
        'Sorry, the server is currently unavailable. Please try again later or ping us on Discord.'
      );
      return;
    }
  }, [username, bio, onSuccess]);

  const handleClearUsernameError = useCallback(() => {
    setUsernameError('');
  }, []);

  const values = useMemo(
    () => ({
      username,
      onUsernameChange: setUsername,
      usernameError,
      onClearUsernameError: handleClearUsernameError,
      bio,
      onBioChange: setBio,
      generalError,
      onEditUser: handleCreateUser,
    }),
    [
      bio,
      generalError,
      handleClearUsernameError,
      handleCreateUser,
      username,
      usernameError,
    ]
  );

  return values;
}
