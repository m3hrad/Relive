import React from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, SafeAreaView, TextInput, FlatList, TouchableOpacity} from 'react-native'
import commonStyles from '../styles/CommonStyles';
import Environment from '../environment'


export default class QuestionScreen extends React.Component {

    state = {
        loading: false,
        error: false,
        data: [],
        count: 0,
        text: ''
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(Environment.BASE_URL+'user/0/communities', {
                method: 'GET'
            });

            const responseJson = await response.json();
            // console.log()

            this.setState({loading: false, data: responseJson.communities})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _submitText= async (text) =>{
        this.setState({loading: true});

        try {
            const response = await fetch(Environment.BASE_URL+'user/0/communities', {
                method: 'GET'
            });

            const responseJson = await response.json();
            this.setState({loading: false, data: responseJson.communities});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _keyExtractor = (item) => item.id;

    _onPress = (itemId) => {
        this.props.navigation.navigate('Community')
    };

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this._onPress(item.id)} style={{flex: 1, flexDirection: 'row' , marginBottom:10}}>
            <Image style={commonStyles.listImage} source={{uri: item.img_url}} />
            <Text style={commonStyles.listText}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

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
                        Failed to load the Communities!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={commonStyles.safeArea}>
                <ScrollView contentContainerStyle={commonStyles.mainScroll}>
                <TextInput
                    style={commonStyles.textInput}
                    placeholder="Search for community"
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    returnKeyType="send"
                    onSubmitEditing={(event) => this._submitText(event.nativeEvent.text)}
                />
                <Text>
                </Text>
                <FlatList
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    horizontal={false}
                />
                </ScrollView>
            </SafeAreaView>
        )
    }
}