import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
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
    ProfileEdit: { screen: ProfileEditScreen }
});

export default TabNavigator(
    {
        ProfileStack: { screen: ProfileStack },
        CommunityStack: { screen: CommunityStack },
        Communities: { screen: CommunitiesScreen },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'CommunityStack') {
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
