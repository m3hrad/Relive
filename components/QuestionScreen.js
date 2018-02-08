import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput} from 'react-native'

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
            const response = await fetch('https://relivee.herokuapp.com/user/1/question', {
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
            await fetch('https://relivee.herokuapp.com/user/1/question', {
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
                <View style={styles.center}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text>
                        Failed to load the question!
                    </Text>
                </View>
            )
        }

        return (
            <SafeAreaView style={{flex : 1}}>
                <Image
                    resizeMode="cover"
                    source={{uri: question.userImageUrl}}
                    style={styles.communityImage}
                />
                <Text style={styles.mainTitle}>
                    {question.text}
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your answer here"
                    onChangeText={(text) => this.setState({text})}
                    returnKeyType="send"
                    onSubmitEditing={(event) => this._submitText(question, event.nativeEvent.text)}
                />

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
        fontSize: 30,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 5
    }
});
