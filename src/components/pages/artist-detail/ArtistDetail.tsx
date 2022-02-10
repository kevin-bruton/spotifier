import { Component } from 'react';
import { withRouter, WithRouterProps }  from '../../../services/withRouter';
import { Artist } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

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
      popularity: 0,
      genres: '',
      followers: 0
    } };
  }

  componentDidMount() {
    this.setState({ artist: (this.props.location.state as Artist) });
  }

  render() {
    const { id, name, imageUrlBig, popularity, genres, followers } = this.state.artist;
    return (
      <Detail>{{
        id,
        type: 'artist',
        title: name,
        subtitle: '',
        imageUrl: imageUrlBig,
        playerSize: 'L',
        data: {
          popularity: `${popularity} / 100`,
          genres,
          followers
        }
      }}</Detail>
    );
  }
}

export default withRouter(ArtistDetail);
