import React from 'react';
import './InputText.scss';
import searchIcon from '../../assets/search-icon.svg';
import clearIcon from '../../assets/close-icon.svg';

type Props = { name: string, label: string, mode: string, placeholder: string, onChange: Function };
type State = { value: string };

export class InputText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({name: this.props.name, value: e.target.value});
    this.setState({ value: e.target.value });
  }

  clear() {
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="inputtext__container">
        <div className="inputtext__labelcontainer">
          <span className="inputtext__label">{this.props.label.toUpperCase()}</span>
        </div>
        <span className="inputtext__icons">
          <img src={searchIcon} className={`inputtext__searchicon${this.props.mode === 'search' ? ' inputtext__searchicon--visible' : ''}`} alt="Search" />
          <img src={clearIcon} className={`inputtext__clearicon${this.state.value ? ' inputtext__clearicon--visible' : ''}`} alt="Clear search" onClick={this.clear.bind(this)}/>
        </span>
        <span className="inputtext__inputbox">
          <input type="text" className={`inputtext__input ${this.props.mode}`} placeholder={this.props.placeholder} value={this.state.value} onChange={this.onChange.bind(this)}/>
        </span>
      </div>
    );
  }
}
