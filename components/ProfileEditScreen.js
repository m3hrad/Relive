import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Switch, ScrollView, TouchableOpacity, FlatList
} from 'react-native'
import commonStyles from '../styles/CommonStyles'
import Environment from '../environment'


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
            const response = await fetch(Environment.BASE_URL+'user/0', {
                method: 'GET'
            });

            const data = await response.json();

            this.setState({loading: false, data: data, languages: data.languages})
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
            await fetch(Environment.BASE_URL+'user/0', {
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
            await fetch(Environment.BASE_URL+'user/0', {
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
        return <TouchableOpacity onPress={()=>this._removeLanguage(language)} key={language.id}>
            <Text>
                {language.name}
            </Text>
        </TouchableOpacity>
    };

    _renderItem = ({item}) => (
        <Text style={{fontSize: 15}} onPress={() => this._addLanguage(item)}>
            {item.name}
        </Text>
    );

    _keyExtractor = (item) => item.id;

    render() {
        const {languages, allLanguages, data, loading, error} = this.state;

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
});
