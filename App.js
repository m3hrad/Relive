import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { Feather } from '@expo/vector-icons'; // 6.2.2
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import ProfileScreen from './components/ProfileScreen';
import CommunityScreen from './components/CommunityScreen';
import CommunitiesScreen from './components/CommunitiesScreen';
import CommunityQuestionScreen from './components/CommunityQuestionScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ReportUserScreen from './components/ReportUserScreen';
import CommunitySearchScreen from './components/CommunitySearchScreen';
import ProfileEditScreen from './components/ProfileEditScreen';
import SettingsScreen from './components/SettingsScreen';
import MyCommunitiesScreen from './components/MyCommunitiesScreen';



const CommunityStack = StackNavigator({
    CommunityQuestion: { screen: CommunityQuestionScreen },
    Community: { screen: CommunityScreen },
    Question: { screen: QuestionScreen },
    Feedback: { screen: FeedbackScreen },
    ReportUser: { screen: ReportUserScreen },
    CommunitySearch: { screen: CommunitySearchScreen },
});

const ProfileStack = StackNavigator({
    Profile: { screen: ProfileScreen},
    ProfileEdit: { screen: ProfileEditScreen },
    Settings: { screen: SettingsScreen }
});

const CommunitiesStack = StackNavigator({
    Communities: { screen: CommunitiesScreen },
    CommunitySearch: { screen: CommunitySearchScreen },
    MyCommunities: { screen: MyCommunitiesScreen },
});

export default TabNavigator(
    {
        ProfileStack: { screen: ProfileStack },
        CommunityStack: { screen: CommunityStack },
        CommunitiesStack: { screen: CommunitiesStack },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'ProfileStack') {
                    iconName = `user`;
                } else if (routeName === 'CommunityStack') {
                    iconName = `message-square`;
                } else if (routeName === 'CommunitiesStack') {
                    iconName = `users`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                // return <Ionicons name={iconName} size={25} color={tintColor} />;
                return <Feather name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {
                backgroundColor: 'white',
                borderTopColor: "transparent"
            },
        },
        animationEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'CommunityStack',

    }
);
