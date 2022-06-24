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
    <form
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
        <hr className="input-hr" />
      </label>

      <div className="form-bottom">
        {(isUserSignedIn())
          ? (
            <button
              type="button"
              className="form-button"
              onClick={assignGoogleUsername}
            >
              Use Google username
            </button>
          )
          : (
            <button
              type="button"
              className="form-button"
              onClick={signInAndAssignUsername}
            >
              Sign-in
            </button>
          )}

        <button type="submit" className="form-button"> Upload score </button>

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
    </form>
  );
}

export default ModalForm;
