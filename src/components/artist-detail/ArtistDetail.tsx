import { Component } from 'react';
import './ArtistDetail.scss';
import { withRouter, WithRouterProps }  from '../../services/withRouter';
import { Artist } from '../../models/interfaces';
import goToImg from '../../assets/goto.svg';

type Props = WithRouterProps<{}>;
type State = { artist: Artist };

class ArtistDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { artist: {
      id: '',
      name: '',
      imageUrl: '',
      imageUrlBig: '',
      externalUrl: '',
      popularity: 0,
      genres: '',
      followers: 0
    } };
  }

  componentDidMount() {
    this.setState({ artist: (this.props.location.state as Artist) });
  }

  render() {
    const { id, name, imageUrlBig, externalUrl, popularity, genres, followers } = this.state.artist;
    return (
      <div className="artistdetail">
        <div className="artistdetail__template">
          <img className="artistdetail__img" src={imageUrlBig} alt="artist detail"/>
          <div className="artistdetail__title">
            <div className="artistdetail__titletype">ARTIST</div>
            <div className="artistdetail__titlename">{name}</div>
          </div>
          <div className="artistdetail__player">
            <iframe title="Spotify Track Player" src={`https://open.spotify.com/embed/artist/${id}`} width="600" height="300" frameBorder="0" allow="encrypted-media"></iframe>
          </div>
          <div className="artistdetail__labels">
            <span>POPULARITY</span>
            <span>GENRES</span>
            <span>FOLLOWERS</span>
            <span>OPEN IN SPOTIFY</span>
          </div>
          <div className="artistdetail__detaildata">
            <span>{popularity} / 100</span>
            <span>{genres}</span>
            <span>{followers}</span>
            <span><a href={externalUrl} target="_blank" rel="noreferrer"><img className="artistdetail__detaildatagoto" alt="artist of the track" src={goToImg} /></a></span>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(ArtistDetail);
