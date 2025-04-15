window.TopBarPlugin = () => {
  return {
    wrapComponents: {
      Topbar: (Original, system) => (props) => {
        const React = system.React;

        // The original Swagger Topbar
        const originalTopbar = React.createElement(Original, props);

        // The logout button/link
        const logoutLink = React.createElement(
          'a',
          {
            href: '/auth/logout',
            style: {
              marginRight: '2rem',
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'whiteSmoke',
              backgroundColor: '#1b1b1b',
              padding: '1.3rem',
            },
          },
          'Logout'
        );

        const appName = React.createElement(
          'h1',
          {
            style: {
              flexGrow: '1',
              textAlign: 'center',
              color: 'whiteSmoke',
              backgroundColor: '#1b1b1b',
              margin: '0px',
              padding: '0.7rem',
            },
          },
          'Inventory API v1.0.0'
        );

        return React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            },
          },
          originalTopbar,
          appName,
          logoutLink
        );
      },
    },
  };
};
