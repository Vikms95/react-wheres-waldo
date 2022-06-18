import React, {
  useState, useEffect, useRef, MouseEventHandler, RefObject, KeyboardEventHandler,
} from 'react';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import mario from '../../assets/mario-snes.png';
import formatTimer from '../../utils/formatTimer';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [dropdownOffset, setDropdownOffset] = useState<number[]>([0, 0]);
  const dropdownRef = useRef<HTMLInputElement>(null);

  /**
   * Renders one of the imported images based on
   * consoleName prop
   */
  const renderGameImage = (name: string | null) => {
    const IMAGES = {
      'super-nintendo': snes,
      gamecube: gc,
      'playstation-1': ps1,
      'playstation-2': ps2,
    };

    return IMAGES[name as keyof typeof IMAGES];
  };

  /**
   * Increments timer state by 1
   */
  const incrementTimer = () => {
    setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
  };

  const renderGameDropdown = (
    event: React.MouseEvent<HTMLImageElement>
    | React.KeyboardEvent<HTMLImageElement>,
  ) => {
    const click = event as any;
    setDropdownOffset([dropdownOffset[0] - click.clientX, dropdownOffset[1] - click.clientY]);

    // move dropdown to the coordinates where the user clicked
    //
    //
    //
  };

  useEffect(() => {
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed]);

  return (
    <main className="gameview-container">
      <div className="dropdown-container" ref={dropdownRef}>
        <ul>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>
      </div>
      <section className="characters-container">
        <img src={mario} alt="terra" className="character-image" />
        <img src={mario} alt="terra" className="character-image" />
        <img src={mario} alt="terra" className="character-image" />
      </section>
      <section className="timer-container">
        {formatTimer(timeElapsed.toString())}
      </section>
      <img
        src={renderGameImage(consoleName)}
        alt={consoleName as string}
        onClick={(e) => renderGameDropdown(e as React.MouseEvent<HTMLImageElement>)}
        onKeyDown={(e) => renderGameDropdown(e as React.KeyboardEvent<HTMLImageElement>)}
      />
    </main>
  );
}
