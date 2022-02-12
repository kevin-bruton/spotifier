import { Component } from 'react';
import { withRouter, WithRouterProps }  from '../../../services/withRouter';
import { Artist } from '../../../models/interfaces';
import Detail from '../../templates/detail/Detail';

type Props = WithRouterProps<{}>;
type State = {};

class ArtistDetail extends Component<Props, State> {

  render() {
    const { id, name, imageUrlBig, popularity, genres, followers } = this.props.location.state as Artist;
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
