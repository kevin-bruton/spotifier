import { Component } from 'react';
import './Detail.scss';
import goToImg from '../../../assets/goto.svg';

interface Children {
  id: string,
  type: string,
  title: string,
  subtitle: string,
  imageUrl: string,
  playerSize: string,
  data: {[key: string]: string|number}
}
type Props = {children: Children};
type State = {};

class Detail extends Component<Props, State> {

  render() {
    const { id, type, title, subtitle, imageUrl, playerSize, data } = this.props.children;
    const playerHeight = playerSize === 'L' ? 400 : 80;
    const externalUrl = `https://open.spotify.com/${type}/${id}`;
    const playerUrl = `https://open.spotify.com/embed/${type}/${id}`;
    const dataItems: {[key: string]: any} = {...data, ...{
      'OPEN IN SPOTIFY': <a href={externalUrl} target="_blank" rel="noreferrer"><img className="detail__detaildatagoto" alt="Open in spotify" src={goToImg} /></a>}
    };

    return (
      <div className="detail">
        <div className="detail__template">
          <div className="detail__imgheading">
            <img className="detail__img" src={imageUrl} alt={`${type} detail`}/>
            <div className="detail__heading">
              <div className="detail__headingtype">{type.toUpperCase()}</div>
              <div className="detail__headingtitle">{title}</div>
              <div className="detail__headingsubtitle">{subtitle}</div>
            </div>
          </div>
          <div className="detail__data">
            <table className="detail__table">
              {Object.keys(dataItems).map(key =>
                <tr className="detail__datarow">
                  <td className="detail__datacell">{key.toUpperCase()}</td>
                  <td className="detail__datacell">{dataItems[key]}</td>
                </tr>  
              )}
            </table>
          </div>
          <div className="detail__player">
            <iframe title="Spotify Player" src={playerUrl} width="380" height={playerHeight} frameBorder="0" allow="encrypted-media"></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
