import { Component } from 'react';
import './AlbumDetail.scss';
import { withRouter, WithRouterProps }  from '../../services/withRouter';
import { Album } from '../../models/interfaces';
import goToImg from '../../assets/goto.svg';

type Props = WithRouterProps<{}>;
type State = { album: Album };

class AlbumDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { album: {
      artist: '',
      externalUrl: '',
      id: '',
      imageUrl: '',
      imageUrlBig: '',
      name: '',
      type: '',
      releaseDate: '',
      totalTracks: 0
    } };
  }

  componentDidMount() {
    this.setState({ album: (this.props.location.state as Album) });
  }

  render() {
    const { name, id, imageUrlBig, artist, externalUrl, type, releaseDate, totalTracks } = this.state.album;
    return (
      <div className="albumdetail">
        <div className="albumdetail__template">
          <img className="albumdetail__img" src={imageUrlBig} alt="track detail"/>
          <div className="albumdetail__title">
            <div className="albumdetail__titletype">ALBUM</div>
            <div className="albumdetail__titlename">{name}</div>
            <div className="albumdetail__titleartist">{artist}</div>
          </div>
          <div className="albumdetail__player">
            <iframe title="Spotify Track Player" src={`https://open.spotify.com/embed/album/${id}`} width="600" height="300" frameBorder="0" allow="encrypted-media"></iframe>
          </div>
          <div className="albumdetail__labels">
            <span>ALBUM TYPE</span>
            <span>RELEASE DATE</span>
            <span>TOTAL TRACKS</span>
            <span>OPEN IN SPOTIFY</span>
          </div>
          <div className="albumdetail__detaildata">
            <span>{type}</span>
            <span>{releaseDate}</span>
            <span>{totalTracks}</span>
            <span><a href={externalUrl} target="_blank" rel="noreferrer"><img className="albumdetail__detaildatagoto" alt="Album of the track" src={goToImg} /></a></span>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(AlbumDetail);
