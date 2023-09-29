import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import User from "./User";

import Explorer from './Explorer';
import MyTabBar from '../../lib/components/tabs/HomeTabBar';
import HomeTabTitle from '../../lib/components/tabs/HomeTabTitle';
import AddPost from './AddPost';
import User from './User';

// Création d'un composant de type BottomTabNavigator

const Tab = createBottomTabNavigator();
// Définition du composant HomeIndex
const HomeIndex = () => (
  // Définition du composant Tab.Navigator
  <Tab.Navigator
    // Définition de la propriété tabBar qui prend en paramètre les props du composant
    // et qui renvoie un composant MyTabBar avec ces props

    tabBar={props => <MyTabBar {...props} />}
    // Définition de la route initiale
    initialRouteName="Explorer">
    <Tab.Screen
      name="Explorer"
      component={Explorer}
      options={{
        headerShown: false,
        // Définition de l'icone associé à l'onglet
        tabBarIcon: ({focused}) => (
          <HomeTabTitle
            focused={focused}
            name="Explorer"
            backgroundColor="#121212"
          />
        ),
      }}
    />

    <Tab.Screen
      name="AddPost"
      component={AddPost}
      options={{
        headerShown: false,
        // Définition de l'icone associé à l'onglet
        tabBarIcon: ({focused}) => (
          <HomeTabTitle
            focused={focused}
            name="AddPost"
            backgroundColor="#121212"
          />
        ),
      }}
    />

    <Tab.Screen
      name="User"
      component={User}
      options={{
        headerShown: false,
        // Définition de l'icone associé à l'onglet
        tabBarIcon: ({focused}) => (
          <HomeTabTitle
            focused={focused}
            name="User"
            backgroundColor="#121212"
          />
        ),
      }}
    />

    {/* Définition d'un onglet UserTab, son composant associé et ses options */}

    {/*<Tab.Screen
      name="Profil"
      component={User}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <HomeTabTitle focused={focused} name="Profil" backgroundColor="white" />
        ),
      }}
    />*/}
  </Tab.Navigator>
);

export default HomeIndex;
