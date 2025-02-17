import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    innerInputContainer: {
        // width: '100%',
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
       
    },
    input: {
        width: '90%',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontSize: 16,
       
        // backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#444',
    },
    loginLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        marginLeft: 5,
        top: 5,
    },
});

export default styles;
