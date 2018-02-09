import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        flex: 1,
        fontSize: 20
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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
    communityImage: {
        height: 200,
        marginBottom: 10
    },
    mainText: {
        flex:1,
        fontSize: 25,
        marginTop: 10,
        textAlign:'center',
    },
    safeArea: {
        flex : 1,
        backgroundColor:'white'
    },
    mainTitle: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 10,
        height: 40,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 2
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 5
    },
    listImage: {
        height: 80,
        width: 80
    },
    listText: {
        fontSize: 20,
        marginTop: 30,
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 0.01,
        marginBottom: 10,
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
    },
    mainScroll: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
});