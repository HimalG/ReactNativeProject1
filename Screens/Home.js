import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Button, Alert, TouchableOpacity} from 'react-native';


const HomeScreen = ({ navigation }) => {
  const [activity, setActivity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [link, setLink] = useState("");
  const [key, setKey] = useState("");
  const [accessibility, setAccessibility] = useState(0);

  const fetchActivity = async () => {
    try {
      const response = await axios.get('https://www.boredapi.com/api/activity');
      setActivity(response.data.activity);
      setType(response.data.type);
      setPrice(response.data.price);
      setParticipants(response.data.participants);
      setLink(response.data.link);
      setKey(response.data.key);
      setAccessibility(response.data.accessibility);
    } catch (error) {
      console.error("Error fetching activity:", error);
      setActivity('Failed to fetch activity. Please try again.');
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
     <TouchableOpacity onPress={()=>fetchActivity()} style={{padding: 10, backgroundColor:"skyblue", marginTop: 16}}>
     <Text style={{fontSize: 16, fontWeight: "600"}}>I am bored</Text>
     </TouchableOpacity>
       <Text>Activity - {activity}</Text>
       <Text>Type - {type}</Text>
       <Text>Participants - {participants}</Text>
       <Text>Price - {price}</Text>
       <Text>Link - {link}</Text>
       <Text>Key - {key}</Text>
       <Text>Accessibility - {accessibility}</Text>
    </View>
  );
}

export default HomeScreen;
