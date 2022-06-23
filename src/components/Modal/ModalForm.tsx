import React, { FormEvent, SyntheticEvent } from 'react';

interface Props{
  playerAlias: string
  selectedConsole: string | null
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
    selectedConsole,
    handleInputChange,
  } = props;
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
        />
        <hr className="input-hr" />
      </label>

      <button type="submit"> Upload score </button>
    </form>
  );
}

export default ModalForm;
