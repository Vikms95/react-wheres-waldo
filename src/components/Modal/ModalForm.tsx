import { sign } from 'crypto';
import React, {
  FormEvent, SyntheticEvent, useContext, useEffect, useState,
} from 'react';
import ConsoleContext from '../../context/ConsoleContext';
import { getUserName, isUserSignedIn, signIn } from '../../utils/setupGoogleSignin';
import ModalButton from './ModalButton';

interface Props{
  playerAlias: string
  setPlayerAlias: React.Dispatch<React.SetStateAction<string>>
  handleInputChange: (event: MouseEvent | SyntheticEvent) => void
  submitScoreToDatabase: (
    e: FormEvent<HTMLFormElement>,
    name: string,
    consoleToSubmit: string | null
    ) => Promise<void>
}

function ModalForm(props: Props) {
  const {
    playerAlias,
    setPlayerAlias,
    submitScoreToDatabase,
    handleInputChange,
  } = props;

  const selectedConsole = useContext(ConsoleContext);

  const assignGoogleUsername = () => {
    setPlayerAlias(() => getUserName() as string);
  };

  const signInAndAssignUsername = async () => {
    await signIn();
    assignGoogleUsername();
  };

  return (
    <>
      <form
        autoComplete="off"
        className="alias-form"
        onSubmit={(e) => submitScoreToDatabase(e, playerAlias, selectedConsole)}
      >
        <label htmlFor="score" className="form-input">
          <input
            id="score"
            type="text"
            value={playerAlias}
            onChange={handleInputChange}
            placeholder="Your alias here ..."
            maxLength={15}
          />
        </label>
        <div className="google-username-container">
          {(isUserSignedIn())
            ? (
              <button
                type="button"
                className="use-google-username"
                onClick={assignGoogleUsername}
              >
                Use Google username
              </button>
            )
            : (
              <span className="google-username">
                Use your Google username?
                <button
                  type="button"
                  className="google-username"
                  onClick={signInAndAssignUsername}
                >
                  Sign in
                </button>
              </span>
            )}
        </div>

        <button
          type="submit"
          className="form-button submit"
        >
          {' '}
          Post score
        </button>
      </form>

      <div className="form-bottom">
        <ModalButton
          type="button"
          content="Leaderboards"
          link="/leaderboards"
          className="leaderboard-button form-button"
        />

        <ModalButton
          type="button"
          className="form-button"
          content="Home"
          link="/"
        />
      </div>
    </>
  );
}

export default ModalForm;
