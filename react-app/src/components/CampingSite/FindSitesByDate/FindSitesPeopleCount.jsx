import { Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import './Style.css';
import useFindSitesPeopleCount from './Hooks/useFindSitesPeopleCount';

const FindSitesPeopleCount = ({ peoplesProps }) => {
  const {
    title,
    decrementAdults,
    decrementChildren,
    decrementToddlers,
    incrementAdults,
    incrementChildren,
    incrementToddlers,
    adults,
    children,
    toddlers,
  } = useFindSitesPeopleCount(peoplesProps);
  return (
    <DropdownButton
      className="position"
      variant="Warning"
      autoClose="outside"
      as={ButtonGroup}
      title={`${title} `}
      id="travlers-dropdown"
      drop="down-centered"
    >
      <div className="travlers-part">
        <span className="mx-2" style={{ padding: '3px' }}>
          מבוגר
        </span>
        <Button variant="outline-secondary" onClick={decrementAdults}>
          -
        </Button>
        <span className="mx-2">{adults}</span>
        <Button variant="outline-secondary" onClick={incrementAdults}>
          +
        </Button>
      </div>
      <Dropdown.Divider />
      <div className="travlers-part">
        <span className="mx-2" style={{ padding: '10px' }}>
          {' '}
          ילד{' '}
        </span>
        <Button variant="outline-secondary" onClick={decrementChildren}>
          -
        </Button>
        <span className="mx-2">{children}</span>
        <Button variant="outline-secondary" onClick={incrementChildren}>
          +
        </Button>
      </div>
      <Dropdown.Divider />
      <div className="travlers-part">
        <span className="mx-2" style={{ padding: '6.5px' }}>
          פעוט
        </span>
        <Button variant="outline-secondary" onClick={decrementToddlers}>
          -
        </Button>
        <span className="mx-2">{toddlers}</span>
        <Button variant="outline-secondary" onClick={incrementToddlers}>
          +
        </Button>
      </div>
    </DropdownButton>
  );
};

export default FindSitesPeopleCount;
