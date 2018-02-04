import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { TabNavigator, TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import ProfileScreen from './components/ProfileScreen';
import CommunityScreen from './components/CommunityScreen';
import CommunitiesScreen from './components/CommunitiesScreen';

export default TabNavigator(
    {
        Profile: { screen: ProfileScreen },
        Community: { screen: CommunityScreen },
        Communities: { screen: CommunitiesScreen },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Community') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                } else if (routeName === 'Communities') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false
        },
        animationEnabled: true,
        swipeEnabled: true,
    }
);
