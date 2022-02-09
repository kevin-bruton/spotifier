import { ComponentType } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export interface WithRouterProps<T = ReturnType<typeof useParams>> {
  history: ReturnType<typeof createBrowserHistory>;
  location: ReturnType<typeof useLocation>;
  match: { params: T; };
  navigate: ReturnType<typeof useNavigate>;
}

export const withRouter = <P extends object>(Component: ComponentType<P>) => {
  return (props: Omit<P, keyof WithRouterProps>) => {
    const location = useLocation();
    const match = { params: useParams() };
    const navigate = useNavigate();
    const history = createBrowserHistory();
    return (
      <Component
        history={history}
        location={location}
        match={match}
        navigate={navigate}
        {...props as P}
      />
    );
  };
};
