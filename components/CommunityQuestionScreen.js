import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import commonStyles from '../styles/CommonStyles'
import Environment from '../environment'

export default class CommunityQuestionScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        community: {}
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(Environment.BASE_URL+'communities/current');
            const community = await response.json();

            this.setState({loading: false, community: community})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    renderCommunity = ({id, name, address, members, rate, img_url}) => {
        return (

            <View
                key={1}
                style={styles.container}
            >
                    <Image
                        resizeMode="cover"
                        source={{uri: img_url}}
                        style={commonStyles.communityImage}
                    />
                <Text style={commonStyles.mainText}>
                Are you in {name} ?
                </Text>
            </View>
        )
    };

    render() {
        const {community, loading, error} = this.state;

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
                        Failed to load posts!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <ScrollView contentContainerStyle={commonStyles.mainScroll}>

                {this.renderCommunity(community)}
                <View style={commonStyles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunitySearch')}>
                        <Text style={commonStyles.button}>
                            NO
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.emptyView}>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Community')}>
                        <Text style={commonStyles.button}>
                            YES
                        </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    emptyView: {
        flex: 1
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
});
