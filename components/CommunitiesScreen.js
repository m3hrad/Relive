import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, TouchableOpacity
} from 'react-native'
import commonStyles from '../styles/CommonStyles'
import Environment from '../environment'


export default class ProfileScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        data: {},
        text: '',
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(Environment.BASE_URL+'user/0', {
                method: 'GET'
            });

            const data = await response.json();

            this.setState({loading: false, data: data})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };


    render() {
        const {data, loading, error} = this.state;

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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCommunities')}>
                            <Text style={commonStyles.button}>
                                My Communities
                            </Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.button}/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunitySearch')}>
                            <Text style={commonStyles.button}>
                                All Communities
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
