import React from 'react';
import './ArrowButton.scss';
import arrowUpIcon from '../../../assets/arrow-up-icon.svg';
import arrowDownIcon from '../../../assets/arrow-down-icon.svg';

type Props = { text: string, onClick: Function };
type State = { position: string };

export class ArrowButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { position: 'closed' };
  }

  clicked() {
    const newPosition = this.state.position === 'closed' ? 'open' : 'closed';
    this.props.onClick({ position: newPosition });
    this.setState({ position: newPosition });
  }

  render() {
    return (
      <div>
        <button type="button" className="button__container" onClick={this.clicked.bind(this)}>
          <span className="button__text">{this.props.text}</span>
          <img className="button__img" src={this.state.position === 'closed' ? arrowDownIcon : arrowUpIcon} alt="Button state"/>
        </button>
      </div>
    );
  }
}
