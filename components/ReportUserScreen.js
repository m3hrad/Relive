import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput, Dimensions, ScrollView, Button
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import CommunityQuestionScreen from "./CommunityQuestionScreen"; //5.3.0


export default class ReportUserScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        data: {},
        text: '',
        rate: 3,
        reporterId: 0
    };

    componentWillMount = async () => {
        try {
            const response = await fetch('https://relivee.herokuapp.com/user/0', {
                method: 'GET'
            });
            const data = await response.json();
            this.setState({loading: false, data: data})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    ratingCompleted = (rate) => {
        this.setState({rate: rate})
    };

    _submitText= async (data) =>{
        this.setState({loading: true});

        try {
            await fetch('https://relivee.herokuapp.com/user/0/report', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.state.text,
                    reportedId: this.state.data.id,
                    reporterId: this.state.data.reporterId
                })
            });
            this.setState({loading: false});
            this.props.navigation.navigate('CommunityQuestion')

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    render() {
        const {data, loading, error} = this.state;

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
                    <View style={styles.center}>
                        <Image
                            resizeMode="cover"
                            source={{uri: data.imageUrl}}
                            style={styles.communityImage}
                        />
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder={"What's the reason of reporting "+ data.firstName +"?"}
                        onChangeText={(text) => this.setState({text})}
                        returnKeyType="send"
                        onSubmitEditing={() => this._submitText(data)}
                        multiline
                    />
                    <View
                        style={styles.empty}/>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}/>
                        <Button
                            title="SEND"
                            onPress={() => this._submitText(data)}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    empty: {
        flex: 8
    },
    scrl: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    communityImage: {
        height: 200,
        width: 200,
        marginTop: 60,
        marginBottom: 10,
        borderRadius:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        bottom: 0,
        justifyContent: 'center',
        width: '100%',
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 5,
    },
    mainTitle: {
        fontSize: 30,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
});
