import React from 'react';
import './CheckBox.scss';

type Props = { label: string, checked: boolean, onCheckedChange: Function, name: string };
export class CheckBox extends React.Component<Props, {}> {
  checked(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onCheckedChange({name: this.props.name, checked: e.target.checked});
  }

  render() {
    return (
      <label className="checkbox__label">
        <input type="checkbox" className="checkbox__input" checked={this.props.checked} alt={`${this.props.label} checkbox`} onChange={this.checked.bind(this)}/>
        <span className="checkbox__span">{this.props.label}</span> 
      </label>
    );
  }
}
