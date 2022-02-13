import { Component } from 'react';
import { WithRouterProps }  from '../../../services/withRouter';
import { Track } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

type Props = WithRouterProps<{}>;
type State = {};

class TrackDetail extends Component<Props, State> {

  render() {
    const { name, id, imageUrlBig, artist, albumName, trackNumber, durationMs, popularity } = this.props.location.state as Track;
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
            mediatype_album: albumName,
            track_number: trackNumber,
            duration: `${durationMins} mins ${durationSecs} secs`,
            popularity: `${popularity} / 100`
          }
        }}
      </Detail>
    );
  }
}

export default TrackDetail;
