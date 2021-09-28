import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView
} from 'react-native';
import Tasklist from './Components/Tasklist'


import AsyncStorage from '@react-native-async-storage/async-storage';



const App = () => {
  const [task, setTask] = useState('');
  //const [email,setemail]=useState('wadhwanidhairya@gmail.com')
  const [id, setid] = useState(0)
  const [taskItems, setTaskItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('mylist1');
      const jsonValue2 = JSON.parse(jsonValue);
      console.log("asyhcn", jsonValue2)
      if (jsonValue2.length) {
        console.log('-------------------->', jsonValue2)
        setTaskItems(jsonValue2);
      }
    } catch (e) {

    } finally {
      setLoading(false)
    }
  };


  const storeData = async (t) => {
    console.log("===>", t)
    try {
      await AsyncStorage.setItem(
        'mylist1',
        JSON.stringify(t)
      );
    } catch (e) {
      console.log("errr", e)
    }
  }



  useEffect(() => {

    getData()

  }, [])

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log("cehck---", task, id)
    setTaskItems(prev => {
      const data = [...prev, { id: new Date().valueOf(), data: task }]
      storeData(data)
      return data
    })
    setid(id + 1)
    setTask('');
    getData()

  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    storeData(itemsCopy)
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View >
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <View key={item.id} style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
              
                
                <Tasklist text={item.data} />
                <TouchableOpacity style={styles.addWrapper}   key={index}
                  onPress={() => completeTask(index)}><Text>Del</Text></TouchableOpacity>
                </View>
              )
            })
        }

        </View>
      </View>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder="Add Task" value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity style={styles.addWrapper} onPress={() => handleAddTask()}><Text>Add+</Text></TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop:30,
    margin:15,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

export default App;


