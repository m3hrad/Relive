import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput,KeyboardAvoidingView, ScrollView} from 'react-native'
import commonStyles from "../styles/CommonStyles";
import Environment from '../environment'

export default class QuestionScreen extends React.Component {

    state = {
        loading: true,
        error: false,
        question: {},
        count: 0,
        text: ''
    };

    componentWillMount = async () => {
        try {
            const response = await fetch(Environment.BASE_URL+'user/1/question', {
                method: 'GET'
            });

            const question = await response.json();

            this.setState({loading: false, question: question})
        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    _submitText= async (question,text) =>{
        this.setState({loading: true});

        try {
            await fetch(Environment.BASE_URL+'user/1/question', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: text,
                    questionId: question.id,
                    askedId: question.askedId,
                    askerId: question.askerId
                })
            });
            this.setState({loading: false});
            this.props.navigation.navigate('Feedback', {
                askedId: question.askedId,
                askerId: question.askerId,
                questionId: question.id
            });

        } catch (e) {
            this.setState({loading: false, error: true})
        }
    };

    render() {
        const {question, loading, error} = this.state;

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
                        Failed to load the question!
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
                                source={{uri: question.userImageUrl}}
                                style={commonStyles.profileImage}
                            />
                        </View>
                        <Text style={commonStyles.mainText}>
                            {question.text}
                        </Text>
                        <TextInput
                            style={commonStyles.textInput}
                            placeholder="Type your answer here"
                            onChangeText={(text) => this.setState({text})}
                            returnKeyType="send"
                            onSubmitEditing={(event) => this._submitText(question, event.nativeEvent.text)}
                        />
                        <View style={{flex:10}}/>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    emptyView: {
        flex: 1
    },
});
