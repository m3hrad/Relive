import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, Button, TouchableOpacity
} from 'react-native'
import commonStyles from '../styles/CommonStyles'
import Environment from '../environment'


export default class SettingsScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        data: {},
        text: '',
        rate: 3,
        notification: false
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(Environment.BASE_URL+'user/0', {
                method: 'GET'
            });

            const data = await response.json();

            this.setState({loading: false, data: data, notification: data.notification})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _setNotification = async (notification) =>{
        try {
            await fetch(Environment.BASE_URL+'user/0', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notification: !notification
                })
            });
            this.setState({loading: false, notification: notification});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    render() {
        const {notification, data, loading, error} = this.state;

        if (loading) {
            return (
                <View style={commonStyles.center}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={commonStyles.center}>
                    <Text>
                        Failed to load the data!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <ScrollView contentContainerStyle={commonStyles.mainScroll}>
                    <View style={{flex:0.5}}/>
                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={commonStyles.button}>
                            Language
                        </Text>
                        <Text style={commonStyles.button}/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                            <Text style={commonStyles.button}>
                                English
                            </Text>
                        </TouchableOpacity>
                        <Text style={{flex:0.1}}>
                        </Text>
                    </View>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={commonStyles.button}>
                            Notification
                        </Text>
                        <Text style={commonStyles.button}/>
                        <Switch
                            onValueChange={ (value) => this._setNotification(value)}
                            value={ notification }
                        />
                        <Text style={{flex:0.1}}>
                        </Text>
                    </View>

                    <View style={{flex:4}}/>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={commonStyles.button}>
                            Contact Us
                        </Text>
                        <Text style={{flex:2}}>
                        </Text>
                    </View>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={commonStyles.button}>
                            About
                        </Text>
                        <Text style={{flex:2}}>
                        </Text>
                    </View>

                    <View style={{flex:1}}/>


                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={{flex:3, fontSize:20}}>
                            Policy and Code of Conduct
                        </Text>
                        <Text style={{flex:0.2}}>
                        </Text>
                    </View>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={{flex:3, fontSize:20}}>
                            Delete My Account
                        </Text>
                        <Text style={{flex:0.2}}>
                        </Text>
                    </View>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.1}}>
                        </Text>
                        <Text style={commonStyles.button}>
                            Logout
                        </Text>
                        <Text style={{flex:2}}>
                        </Text>
                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    empty: {
        flex: 2
    }
});
