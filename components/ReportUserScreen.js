import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity
} from 'react-native'
import commonStyles from "../styles/CommonStyles";
import Environment from '../environment'


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
            const response = await fetch(Environment.BASE_URL+'user/0', {
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
            await fetch(Environment.BASE_URL+'user/0/report', {
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

                    <TextInput
                        style={commonStyles.textInput}
                        placeholder={"What's the reason of reporting "+ data.firstName +"?"}
                        onChangeText={(text) => this.setState({text})}
                        returnKeyType="send"
                        onSubmitEditing={() => this._submitText(data)}
                        multiline
                    />
                    <View
                        style={styles.empty}/>
                    <View style={commonStyles.buttonContainer}>
                        <Text style={commonStyles.button}/>
                        <TouchableOpacity onPress={() => this._submitText(data)}>
                            <Text style={commonStyles.button}>
                                SEND
                            </Text>
                        </TouchableOpacity>
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
});