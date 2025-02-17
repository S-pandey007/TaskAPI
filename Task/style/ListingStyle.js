import { StyleSheet } from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20,
    },
    header:{
        paddingVertical:20,
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:16,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginBottom:10,
    },
    logoutContainer:{
        backgroundColor:'#333',
        padding:10,
        borderRadius:10,
        marginTop:10,
    },
    logout:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
    headerText:{
        fontSize:20,
        
        color:'#000',
    },
    highlight: {
        fontWeight: "bold",
        color: "#000",
      },

      languageSwitcher: {
        position: 'absolute',
        bottom:20,
        right:20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation:5,
        zIndex:1,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      languageOption: {
        fontSize: 18,
        paddingVertical: 10,
        color: "#fff",
        backgroundColor:'#333',
        textAlign: "center",
      },

      modalContent:{
        backgroundColor:'#fff',
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
      modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent dark backdrop
      },

    card:{
        backgroundColor:'#f9f9f9',
        padding:15,
        borderRadius:10,
        elevation:5,
        marginBottom:10,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:5,
        color:'#333',
    },
    body:{
        fontSize:14,
        color:'#666',
    }
})
export default styles;
