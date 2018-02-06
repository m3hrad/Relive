import React from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, SafeAreaView } from 'react-native'


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

    renderCommunity = ({name, address, members, rate}) => {
        return (
            <View
                key={1}
                style={styles.post}
            >
                <View style={styles.postNumber}>
                    <Text>
                        {name}
                    </Text>
                </View>
                <View style={styles.postNumber}>
                    <Text>
                        {members}
                    </Text>
                </View>
                <View style={styles.postContent}>
                    <Text>
                        {address}
                    </Text>
                    <Text style={styles.postBody}>
                        {rate}
                    </Text>
                </View>
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
            <SafeAreaView>
                {this.renderCommunity(community)}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    post: {
        flexDirection: 'row',
    },
    postNumber: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postContent: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingVertical: 25,
        paddingRight: 15,
    },
    postBody: {
        marginTop: 10,
        fontSize: 12,
        color: 'lightgray',
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
});
