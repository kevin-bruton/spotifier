import { Component } from 'react';
import { withRouter, WithRouterProps }  from '../../../services/withRouter';
import { Album } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

type Props = WithRouterProps<{}>;
type State = {};

class AlbumDetail extends Component<Props, State> {

  render() {
    const { name, id, imageUrlBig, artist, type, releaseDate, totalTracks } = this.props.location.state as Album;
    return (
      <Detail>
        {{
          id,
          type: 'album',
          title: name,
          subtitle: artist,
          imageUrl: imageUrlBig,
          playerSize: 'L',
          data: {
            'album_type': type,
            'release_date': releaseDate,
            'total_tracks': totalTracks
          }
        }}
      </Detail>
    );
  }
}

export default withRouter(AlbumDetail);
