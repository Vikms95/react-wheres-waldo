import React, { FormEvent, SyntheticEvent, useContext } from 'react';
import ConsoleContext from '../../context/ConsoleContext';

interface Props{
  playerAlias: string
  handleInputChange: (event: MouseEvent | SyntheticEvent) => void
  submitScoreToDatabase: (
    e: FormEvent<HTMLFormElement>,
    name: string,
    consoleToSubmit: string | null
    ) => Promise<void>
}

function ModalForm(props: Props) {
  const {
    submitScoreToDatabase,
    playerAlias,
    handleInputChange,
  } = props;

  const selectedConsole = useContext(ConsoleContext);

  return (
    <form
      className="alias-form"
      onSubmit={(e) => submitScoreToDatabase(e, playerAlias, selectedConsole)}
    >

      <label htmlFor="score" className="form-input">
        Enter alias
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

      <button type="submit"> Upload score </button>
    </form>
  );
}

export default ModalForm;
