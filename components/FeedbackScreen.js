import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView,
    KeyboardAvoidingView} from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import commonStyles from "../styles/CommonStyles";


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
            <KeyboardAvoidingView
                behavior="padding"
                style={{flex:1}}
            >
            <SafeAreaView style={commonStyles.safeArea}>
                <ScrollView contentContainerStyle={commonStyles.mainScroll}>
                    <View style={commonStyles.center}>
                        <Image
                            resizeMode="cover"
                            source={{uri: feedback.askedImageUrl}}
                            style={commonStyles.profileImage}
                        />
                    </View>
                    <Text style={commonStyles.mainText}>
                        How do you rate your interaction with {feedback.askedName} in {feedback.communityName} about the {feedback.questionCategory}?
                    </Text>
                    <AirbnbRating
                        size={20}
                        onFinishRating={this.ratingCompleted}
                        style={{flex:3}}
                    />

                    <TextInput
                        style={commonStyles.textInput}
                        placeholder="It would be great if you tell us why."
                        onChangeText={(text) => this.setState({text})}
                        returnKeyType="send"
                        onSubmitEditing={() => this._submitText(feedback)}
                    />
                    <View
                        style={styles.rating}/>
                    <View style={commonStyles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReportUser')}>
                            <Text style={commonStyles.button}>
                                REPORT
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.empty}/>
                        <TouchableOpacity onPress={() => this._submitText(feedback)}>
                            <Text style={commonStyles.button}>
                                SEND
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    empty: {
        flex: 5
    },
    rating: {
        flex: 2
    },
});
