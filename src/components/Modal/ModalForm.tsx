import React, { FormEvent, SyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getUserName, isUserSignedIn, signIn } from '../../utils/setupGoogleSignin';
import ConsoleContext from '../../context/ConsoleContext';
import formatTimer from '../../utils/formatTimer';
import getCurrentDate from '../../utils/getCurrentDate';

interface Props{
  timeElapsed: number
  playerAlias: string
  setPlayerAlias: React.Dispatch<React.SetStateAction<string>>
  handleInputChange: (event: MouseEvent | SyntheticEvent) => void
}

function ModalForm(props: Props) {
  const {
    timeElapsed,
    playerAlias,
    setPlayerAlias,
    handleInputChange,
  } = props;

  const selectedConsole = useContext(ConsoleContext);
  const navigate = useNavigate();
  /**
   * Submits a new "highscore" item to the respective
   * collection based on the parameter "consoleToSubmit"
   */
  const submitScoreToDatabase = async (
    e: FormEvent<HTMLFormElement>,
    name: string,
    consoleToSubmit: string | null,
  ) => {
    e.preventDefault();
    const { score, alias } = getScoreInfo(name);
    const date = getCurrentDate();
    setPlayerAlias('');
    navigateToURL('/');

    try {
      await addDoc(
        collection(getFirestore(), `highscores-${consoleToSubmit}`),
        { alias, score, date },
      );
    } catch (err) {
      console.error('Error submiting your item to the database', err);
    }
  };

  const navigateToURL = (url: string) => {
    navigate(url);
  };

  /**
   * Gets the name parameter that if empty, returns "Anonymous"
   * Gets the time from timeElapsed and formats it to ++:++
   */
  const getScoreInfo = (name: string) => {
    const alias = name || 'Anonymous';
    const score = formatTimer(timeElapsed.toString());
    return { score, alias };
  };

  const assignGoogleUsername = () => {
    setPlayerAlias(() => getUserName() as string);
  };

  const signInAndAssignUsername = async () => {
    await signIn();
    assignGoogleUsername();
  };

  return (
    <form
      autoComplete="off"
      className="alias-form"
      onSubmit={(e) => submitScoreToDatabase(e, playerAlias, selectedConsole)}
    >
      <label htmlFor="score" className="form-input">
        <input
          id="score"
          type="text"
          maxLength={15}
          value={playerAlias}
          onChange={handleInputChange}
          placeholder="Your alias here ..."
        />
      </label>
      <div className="google-username-container">
        {(isUserSignedIn())
          ? (
            <button
              type="button"
              tabIndex={-1}
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
                tabIndex={-1}
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
  );
}

export default ModalForm;
