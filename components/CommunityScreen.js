import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, FlatList, Dimensions, TouchableOpacity
} from 'react-native'
import commonStyles from '../styles/CommonStyles';
import Environment from "../environment";

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
            style={commonStyles.communityImage}
        />;
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
                <Text style={commonStyles.mainTitle}>
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
                <View style={commonStyles.center}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={commonStyles.center}>
                    <Text>
                        Failed to load the community!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={commonStyles.safeArea}>
                {this.renderCommunity(community)}
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
    membersContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: '2.5%',
        marginRight: '2.5%',
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
});
