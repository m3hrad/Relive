import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, Button
} from 'react-native'


export default class FeedbackScreen extends React.Component {

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
                <View style={styles.center}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text>
                        Failed to load the data!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={{flex : 1}}>
                <ScrollView contentContainerStyle={styles.scrl}>
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
                    <View style={styles.center}>
                        <Image
                            resizeMode="cover"
                            source={{uri: data.imageUrl}}
                            style={styles.profileImage}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={{flex:0.5}}>
                        </Text>
                        <Button
                            title="Edit Profile"
                            onPress={() => this.props.navigation.navigate('ProfileEdit')}
                            style={styles.button}
                        />
                        <Text style={styles.button}/>
                        <Button
                            title="Settings"
                            onPress={() => this.props.navigation.navigate('Settings')}
                            style={styles.button}
                        />
                        <Text style={{flex:0.5}}>
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
    },
    scrl: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 2,
        bottom: 0,
        justifyContent: 'center',
        width: '100%',
    },
    profileImage: {
        height: 200,
        width: 200,
        marginTop: 60,
        marginBottom: 10,
        borderRadius:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
