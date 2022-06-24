import React, {
  FormEvent, SyntheticEvent, useContext, useEffect,
} from 'react';
import ConsoleContext from '../../context/ConsoleContext';
import { getUserName } from '../../utils/setupGoogleSignin';

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

  useEffect(() => {
    console.log(getUserName());
  });

  const selectedConsole = useContext(ConsoleContext);

  const assignGoogleUsername = () => {
    setPlayerAlias(getUserName() as string);
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
        <button
          type="button"
          className="use-google-username"
          onClick={assignGoogleUsername}
        >
          Use Google username
        </button>
      </label>

      <button type="submit"> Upload score </button>
    </form>
  );
}

export default ModalForm;
