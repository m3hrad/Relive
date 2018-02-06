import React from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, SafeAreaView, Button } from 'react-native'


export default class CommunityScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        community: {}
    };

    componentWillMount = async () => {
        try {
            const response = await fetch('https://relivee.herokuapp.com/communities/current');
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
                        style={styles.communityImage}
                    />
                <Text style={styles.mainQuestion}>
                Are you in {name} ?
                </Text>
            </View>
        )
    };

    render() {
        const {community, loading, error} = this.state;

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
                        Failed to load posts!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={{flex : 1}}>
                {this.renderCommunity(community)}
                <Text>yo</Text>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    emptyView: {
        flex: 1
    },
    button: {
        flex: 1
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'stretch',
        width: '100%'

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        padding: 15,
        backgroundColor: 'skyblue',
    },
    communityImage: {
        height: 300,
    },
    mainQuestion: {
        flex:1,
        fontSize: 30,
        marginTop: 10,
        textAlign:'center',
        height:100
    }
});
