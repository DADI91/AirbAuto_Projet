import React, {PureComponent} from 'react';
import {View} from 'react-native';
import AppIndex from './app/screen/AppIndex';

class App extends PureComponent {
  getActiveRoute = navigationState => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRoute(route);
    }
    return route;
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <AppIndex />
      </View>
    );
  }
}

export default App;
