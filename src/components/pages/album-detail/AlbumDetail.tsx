import { Component } from 'react';
import { withRouter, WithRouterProps }  from '../../../services/withRouter';
import { Album } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

type Props = WithRouterProps<{}>;
type State = { album: Album };

class AlbumDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { album: {
      artist: '',
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
    const { name, id, imageUrlBig, artist, type, releaseDate, totalTracks } = this.state.album;
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
            'album type': type,
            'release date': releaseDate,
            'total tracks': totalTracks
          }
        }}
      </Detail>
    );
  }
}

export default withRouter(AlbumDetail);
