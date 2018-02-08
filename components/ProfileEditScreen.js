import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, Button, FlatList
} from 'react-native'


export default class ProfileEditScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        data: {},
        text: '',
        rate: 3,
        visibility: false,
        languages: [],
        allLanguages: [{'id': 2, 'name':'Finnish'},{'id': 3, 'name':'Swedish'},{'id': 4, 'name':'Finnish'},
            {'id': 5, 'name':'Swedish'},{'id': 6, 'name':'Finnish'},{'id': 7, 'name':'Swedish'},
            {'id': 8, 'name':'Finnish'},{'id': 9, 'name':'Swedish'},{'id': 10, 'name':'Finnish'},{'id': 11, 'name':'Swedish'}]
    };

    componentWillMount = async () => {
        try {
            const response = await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'GET'
            });

            const data = await response.json();

            this.setState({loading: false, data: data, toggled: data.visible, languages: data.languages})
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

    _removeLanguage = async (language) => {
        let languages = this.state.languages;
        for (let i in languages){
            if (languages[i].id === language.id){
                languages.splice(i,1);
            }
        }

        let allLanguages = this.state.allLanguages;
        allLanguages.push(language);

        try {
            await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    languages: languages
                })
            });
            this.setState({loading: false, languages: languages, allLanguages: allLanguages});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _addLanguage = async (language) => {
        let languages = this.state.languages;
        languages.push(language);

        let allLanguages = this.state.allLanguages;
        for (let i in allLanguages){
            if (allLanguages[i].id === language.id){
                allLanguages.splice(i,1);
            }
        }

        try {
            await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    languages: languages
                })
            });
            this.setState({loading: false, languages: languages, allLanguages: allLanguages});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _renderLanguage = (language) => {
        return <Button
            key={language.id}
            title={language.name}
            onPress={() => this._removeLanguage(language)}
            style={styles.button}
        />
    };

    _renderItem = ({item}) => (
        <Text style={{fontSize: 15}} onPress={() => this._addLanguage(item)}>
            {item.name}
        </Text>
    );

    _onPress = (itemId) => {
        // alert(itemId);
        this.props.navigation.navigate('Question')
    };

    _keyExtractor = (item) => item.id;

    render() {
        const {languages, allLanguages, data, loading, error} = this.state;
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
                        <Text style={{flex:1}}>
                            Speaking Languages
                        </Text>
                        <Text style={{flex:0.5}}>
                        </Text>
                        <View style={{flex:1, flexDirection: 'column'}}>
                            <View style={{flex:0.1, flexDirection: 'column'}}>
                            {languages.map(item => this._renderLanguage(item))}
                            </View>
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={allLanguages}
                                    extraData={allLanguages}
                                    keyExtractor={this._keyExtractor}     //has to be unique
                                    renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                                    horizontal={false}
                                    style={styles.flatList}
                                />
                            </View>
                        </View>
                        <Text style={{flex:0.5}}>
                        </Text>
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    flatListContainer: {
        height: 50,
    },
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
