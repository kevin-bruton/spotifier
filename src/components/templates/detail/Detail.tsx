import { Component } from 'react';
import './Detail.scss';
import goToImg from '../../../assets/goto.svg';
import { t } from '../../../services/literals';

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
      detail_open_in_spotify: <a href={externalUrl} target="_blank" rel="noreferrer"><img className="detail__detaildatagoto" alt={t('detail_open_in_spotify')} src={goToImg} /></a>}
    };

    return (
      <div className="detail">
        <div className="detail__template">
          <div className="detail__imgheading">
            <img className="detail__img" src={imageUrl} alt={t(`detail_type_${type}`)}/>
            <div className="detail__heading">
              <div className="detail__headingtype">{t(`mediatype_${type}`).toUpperCase()}</div>
              <div className="detail__headingtitle">{title}</div>
              <div className="detail__headingsubtitle">{subtitle}</div>
            </div>
          </div>
          <div data-testid="detail_data" className="detail__data">
            <table className="detail__table">
              <tbody>
                {Object.keys(dataItems).map(key =>
                  <tr key={key} className="detail__datarow">
                    <td className="detail__datacell">{t(key).toUpperCase()}</td>
                    <td className="detail__datacell">{dataItems[key]}</td>
                  </tr>  
                )}
              </tbody>
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
