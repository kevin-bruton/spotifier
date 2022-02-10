import { Component } from 'react';
import { withRouter, WithRouterProps }  from '../../../services/withRouter';
import { Track } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

type Props = WithRouterProps<{}>;
type State = { track: Track };

class TrackDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { track: {
      artist: '',
      id: '',
      imageUrl: '',
      imageUrlBig: '',
      name: '',
      albumName: '',
      trackNumber: 0,
      durationMs: 0,
      popularity: 0
    } };
  }

  componentDidMount() {
    this.setState({ track: (this.props.location.state as Track) });
  }

  render() {
    const { name, id, imageUrlBig, artist, albumName, trackNumber, durationMs, popularity } = this.state.track;
    const durationMins = Math.floor(durationMs / 1000 / 60);
    const durationSecs = Math.round((durationMs / 1000) - (durationMins * 60));
    return (
      <Detail>
        {{
          id,
          type: 'track',
          title: name,
          subtitle: artist,
          imageUrl: imageUrlBig,
          playerSize: 'S',
          data: {
            album: albumName,
            'track number': trackNumber,
            duration: `${durationMins} mins ${durationSecs} secs`,
            popularity: `${popularity} / 100`
          }
        }}
      </Detail>
    );
  }
}

export default withRouter(TrackDetail);
