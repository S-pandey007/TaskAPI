import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'
import styles from '../style/DetailsStyle';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

const Details = ({route}) => {
    const {id} = route.params;
    const [post,setPost] = useState({});
    const [image,setImage] = useState({});
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation();
    console.log(id);

    const fetchPost = async () => {
      setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const response2 = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
        const data2 = await response2.json();
        const data = await response.json();
        console.log(data);
        console.log(data2.thumbnailUrl);
        setImage(data2);
        setPost(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchPost();
    },[])
  return (
    <View style={styles.container}>
    {
      !loading ? (<>
      <AntDesign onPress={()=>navigation.goBack()} name="arrowleft" size={24} color="black" />
      <Image 
      source={{uri:image.thumbnailUrl}}
      style={styles.image}
      alt="image"
      />

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      </>) : (
        <LottieView
        source={require("../assets/animationJSON/loadinganimation.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      )
    }

    </View>
  )
}

export default Details