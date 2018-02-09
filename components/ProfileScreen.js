import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, Button, TouchableOpacity
} from 'react-native'
import commonStyles from '../styles/CommonStyles';

export default class ProfileScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        data: {},
        text: '',
        rate: 3,
        visibility: false
    };

    componentWillMount = async () => {
        try {
            const response = await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'GET'
            });

            const data = await response.json();

            this.setState({loading: false, data: data, toggled: data.visible})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _setVisibility = async (visibility) =>{
        try {
            await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    visibility: !visibility
                })
            });
            this.setState({loading: false, visibility: visibility});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    render() {
        const {data, loading, error} = this.state;
        const visibility_value = this.state.visibility ? 'Active' : 'Passive';

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
                    <Text style={{flex:0.3}}/>
                    <View style={{flex:0.2, flexDirection:'row'}}>
                        <Text style={{flex:2}}>
                        </Text>
                        <Text style={{flex:1, width: 10, fontSize: 20, marginTop: 7}}>
                            {visibility_value}
                        </Text>
                        <Switch
                            onValueChange={ (value) => this._setVisibility(value)}
                            value={ this.state.visibility }
                        />
                        <Text style={{flex:0.3}}>
                        </Text>
                    </View>
                    <View style={commonStyles.center}>
                        <Image
                            resizeMode="cover"
                            source={{uri: data.imageUrl}}
                            style={commonStyles.profileImage}
                        />
                    </View>

                    <View style={commonStyles.buttonContainer}>
                        <Text style={{flex:0.5}}>
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileEdit')}>
                            <Text style={commonStyles.button}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.button}/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                            <Text style={commonStyles.button}>
                                Settings
                            </Text>
                        </TouchableOpacity>
                        <Text style={{flex:0.5}}>
                        </Text>
                    </View>
                    <View style={{flex:2}}/>
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
