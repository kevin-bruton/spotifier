import React from 'react';
import './ItemCard.scss';
import imgFallback from '../../../assets/fallback-music.svg';

type Props = { title: string, subtitle: string, imageurl: string };
type State = { imageUrl: string };

export class ItemCard extends React.Component<Props, State> {
  _isMounted = false;

  constructor(props: Props) {
    super(props);
    this.state = { imageUrl: imgFallback };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadImage();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: { imageurl: string}) {
    if (prevProps.imageurl !== this.props.imageurl) {
      this.loadImage();
    }
  }

  loadImage() {
    const img = new Image();
    img.onload = () => this._isMounted && this.setState({ imageUrl: this.props.imageurl });
    img.src = this.props.imageurl;
  }

  render() {
    return (
      <div className="itemcard">
        <img className="itemcard__img" src={this.state.imageUrl} alt={this.props.title}/>
        <div className="itemcard__title">{this.props.title}</div>
        <div className="itemcard__subtitle">{this.props.subtitle}</div>
      </div>
    );
  }
}
