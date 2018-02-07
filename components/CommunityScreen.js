import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, FlatList, Dimensions, TouchableOpacity
} from 'react-native'

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 );


export default class CommunityScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        community: {},
        count: 0
    };

    renderHeader = (image_url) => {
        return <Image
            resizeMode="cover"
            source={{uri: image_url}}
            style={styles.communityImage}
        />;
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

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this._onPress(item.id)}>
            <Image style={{ height: 150,  width : equalWidth}} source={{uri: item.imageUrl}} />
        </TouchableOpacity>
    );

    _onPress = (itemId) => {
        // alert(itemId);
        this.props.navigation.navigate('Question')
    };

    _keyExtractor = (item, index) => item.id;

    renderCommunity = ({id, name, address, members, rate, img_url}) => {
        return (

            <View
                key={1}
                style={styles.container}
            >
                <Text style={styles.mainTitle}>
                {name}
                </Text>
                <FlatList
                    data={members}
                    keyExtractor={this._keyExtractor}     //has to be unique
                    renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                    horizontal={false}
                    numColumns={2}
                    style={styles.flatList}
                    ListHeaderComponent={this.renderHeader(img_url)}
                />
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
                        Failed to load the community!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={{flex : 1}}>
                {this.renderCommunity(community)}
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
    membersContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        backgroundColor: 'yellow',
    },
    membersImage: {
        width: '5%',
        height: 150,
        margin: '2.5%',
        top: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
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
        height: 200,
        marginBottom: 10
    },
    mainTitle: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 10,
        height: 40,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 2
    },
    flatList: {
        marginTop: 0
    }
});
