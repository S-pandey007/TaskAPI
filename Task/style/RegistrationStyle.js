import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30, // Prevents content from being cut off
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  animation: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  innerInputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 15, // Better spacing between fields
  },
  input: {
    width: '100%', // Full width for better alignment
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#444',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 4,
    alignSelf: 'center',
    top:5
  },
});

export default styles;
