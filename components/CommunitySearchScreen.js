import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput, FlatList, TouchableOpacity} from 'react-native'

export default class QuestionScreen extends React.Component {

    state = {
        loading: false,
        error: false,
        communities: [],
        count: 0,
        text: ''
    };

    _submitText= async (text) =>{
        this.setState({loading: true});

        try {
            const response = await fetch('https://relivee.herokuapp.com/communities', {
                method: 'GET'
            });

            const responseJson = await response.json();
            this.setState({loading: false, communities: responseJson.communities});

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
            <Image style={{ height: 80,  width : 80}} source={{uri: item.img_url}} />
            <Text style={{fontSize : 20, marginTop: 30, marginLeft: 10}}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    render() {
        const {communities, loading, error} = this.state;

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
                        Failed to load the Communities!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={{flex : 1}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search for community"
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    returnKeyType="send"
                    onSubmitEditing={(event) => this._submitText(event.nativeEvent.text)}
                />
                <Text>
                </Text>
                <FlatList
                    data={communities}
                    keyExtractor={this._keyExtractor}     //has to be unique
                    renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                    horizontal={false}
                    style={styles.flatList}
                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 5
    }
});