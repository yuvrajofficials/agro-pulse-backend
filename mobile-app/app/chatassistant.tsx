import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library
import NavigationTab from './Utils/NavigationTab';

const API_URL = 'http://3.88.88.249'; // Update this URL to match your FastAPI server address

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  const sendTextMessage = async (text) => {
    try {
      const instruction = text;
      const response = await axios.post(`${API_URL}/chatbot`, { instruction });
      const botResponse = response.data.completion
        ? `${response.data.completion}`
        : 'Error processing text';
      const newMessage = {
        _id: Math.random(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2, // Bot's user ID
          name: 'Chatbot',
          avatar: 'https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg', // Chatbot icon
        },
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSendText = () => {
    const newMessage = {
      _id: Math.random(),
      text: textInput,
      createdAt: new Date(),
      user: {
        _id: 1, // User's ID
        name: 'User',
      },
    };
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
    sendTextMessage(textInput);
    setTextInput('');
  };

  const renderBubble = (props) => {
    const { user } = props.currentMessage;
    if (user._id === 2) {
      // Chatbot response with gradient background
      return (
        <View style={styles.gradientBubbleContainer}>
          <LinearGradient
            colors={['#00B685', '#46c67c']}
            style={styles.gradientBubble}
          >
            <Text style={styles.gradientBubbleText}>{props.currentMessage.text}</Text>
          </LinearGradient>
        </View>
      );
    } else {
      // User's message with gray background
      return (
        <View style={styles.grayBubble}>
          <Text style={styles.grayBubbleText}>{props.currentMessage.text}</Text>
        </View>
      );
    }
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: 'center' }}
        renderActions={() => (
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="robot-outline" size={28} color="#00B685" />
            {/* <Image source={"../assets/images/App_Logo_bg.png"} style={styles.diseaseImage} /> */}
            
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderSendButton = () => (
    <TouchableOpacity onPress={handleSendText} style={styles.sendButton}>
      <LinearGradient
        colors={['#00B685', '#46c67c']}
        style={styles.gradientButton}
      >
            <Icon name="send" size={28} color="#fff" />

        {/* <Text style={styles.sendButtonText}>Send</Text> */}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={(messages = []) =>
            setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
          }
          user={{
            _id: 1,
            name: 'User',
          }}
          renderBubble={renderBubble}
          renderInputToolbar={(props) => (
            <View style={styles.inputContainer}>
              <TextInput
              
                style={styles.input}
                placeholder="Type your message..."
                value={textInput}
                onChangeText={setTextInput}
              />
              {renderSendButton()}
            </View>
          )}
        />
      </View>
      <View style={styles.navbarComp}>
        <NavigationTab />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 90, // Space for the fixed navbar
  },
  gradientBubbleContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  gradientBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  gradientBubbleText: {
    color: '#fff',
    fontSize: 16,
  },
  grayBubble: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '75%',
    marginBottom: 8,
  },
  grayBubbleText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navbarComp: {
    padding:20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensures navbar stays on top of other content
  },
  iconContainer: {
    marginRight: 10,
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default ChatApp;
