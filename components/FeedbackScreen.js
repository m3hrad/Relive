import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput, Dimensions, ScrollView, Button
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings'; //5.3.0


export default class FeedbackScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        feedback: {},
        text: '',
        rate: 3
    };

    componentWillMount = async () => {
        try {
            const response = await fetch('https://relivee.herokuapp.com/user/0/interactions/0/feedback', {
                method: 'GET'
            });

            const feedback = await response.json();

            this.setState({loading: false, feedback: feedback})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };


    ratingCompleted = (rate) => {
        this.setState({rate: rate})
    };

    _submitText= async (feedback) =>{
        this.setState({loading: true});

        try {
            await fetch('https://relivee.herokuapp.com/user/0/interactions/0/feedback', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: this.state.text,
                    rate: this.state.rate,
                    interactionId: feedback.id
                })
            });
            this.setState({loading: false});

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    render() {
        const {feedback, loading, error} = this.state;

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
                            source={{uri: feedback.askedImageUrl}}
                            style={styles.communityImage}
                        />
                    </View>
                    <Text style={styles.mainTitle}>
                        How do you rate your interaction with {feedback.askedName} in {feedback.communityName} about the {feedback.questionCategory}?
                    </Text>
                    <AirbnbRating
                        size={30}
                        onFinishRating={this.ratingCompleted}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="It would be great if you tell us why."
                        onChangeText={(text) => this.setState({text})}
                        returnKeyType="send"
                        onSubmitEditing={() => this._submitText(feedback)}
                    />
                    <View
                        style={styles.rating}/>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="REPORT"
                            onPress={() => this.props.navigation.navigate('ReportUser')}
                            style={styles.button}
                        />
                        <Text style={styles.button}/>
                        <Button
                            title="SEND"
                            onPress={() => this._submitText(feedback)}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    rating: {
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
