import { Component } from 'react';
import './TrackDetail.scss';
import { withRouter, WithRouterProps }  from '../../services/withRouter';
import { Track } from '../../models/interfaces';
import goToImg from '../../assets/goto.svg';

type Props = WithRouterProps<{}>;
type State = { track: Track };

class TrackDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { track: {
      artist: '',
      externalUrl: '',
      id: '',
      imageUrl: '',
      imageUrlBig: '',
      name: '',
      previewUrl: '',
      albumName: '',
      trackNumber: 0,
      durationMs: 0,
      popularity: 0
    } };
  }

  componentDidMount() {
    this.setState({ track: (this.props.location.state as Track) });
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
  }

  render() {
    const { name, id, imageUrlBig, artist, albumName, trackNumber, durationMs, popularity, externalUrl } = this.state.track;
    const durationMins = Math.floor(durationMs / 1000 / 60);
    const durationSecs = Math.round((durationMs / 1000) - (durationMins * 60));
    return (
      <div className="trackdetail">
        <div className="trackdetail__template">
          <img className="trackdetail__img" src={imageUrlBig} alt="track detail"/>
          <div className="trackdetail__title">
            <div className="trackdetail__titletype">TRACK</div>
            <div className="trackdetail__titlename">{name}</div>
            <div className="trackdetail__titleartist">{artist}</div>
          </div>
          <div className="trackdetail__player">
            <iframe title="Spotify Track Player" src={`https://open.spotify.com/embed/track/${id}`} width="600" height="80" frameBorder="0" allow="encrypted-media"></iframe>
          </div>
          <div className="trackdetail__labels">
            <span>ALBUM</span>
            <span>TRACK NUMBER</span>
            <span>DURATION</span>
            <span>POPULARITY</span>
            <span>OPEN IN SPOTIFY</span>
          </div>
          <div className="trackdetail__detaildata">
            <span>{albumName}</span>
            <span>{trackNumber}</span>
            <span>{`${durationMins} mins ${durationSecs} secs`}</span>
            <span>{popularity} / 100</span>
            <span><a href={externalUrl} target="_blank" rel="noreferrer"><img className="trackdetail__detaildatagoto" alt="Album of the track" src={goToImg} /></a></span>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(TrackDetail);
