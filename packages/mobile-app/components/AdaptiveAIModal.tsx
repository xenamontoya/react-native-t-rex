import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Linking,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';
import BottomSheet from './BottomSheet';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AdaptiveAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  mode?: 'insights' | 'preparation' | 'career';
  tabletLayout?: 'fullScreen' | 'largeModal'; // New option for iPad layout
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'wingman';
  timestamp: Date;
}

interface VideoRecommendation {
  title: string;
  url: string;
  description?: string;
}

const AdaptiveAIModal: React.FC<AdaptiveAIModalProps> = ({ 
  isOpen, 
  onClose, 
  lessonTitle, 
  mode = 'insights',
  tabletLayout = 'fullScreen' // Default to full-screen for chat
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Detect device type for adaptive design
  const isTablet = screenWidth >= 768;
  const isLandscape = screenWidth > screenHeight;

  const suggestedQuestions = mode === 'preparation' ? [
    "What factors influence Va?",
    "Class B airspace requirements?",
    "Pre-flight weather planning?",
    "Radio phraseology tips?",
  ] : mode === 'career' ? [
    "What pilot career paths exist?",
    "How to build flight hours?",
    "Commercial license requirements?",
    "Best aviation schools?",
  ] : [
    "How did my radio work?",
    "Airspeed control tips?",
    "Landing technique notes?",
    "Pattern positioning?",
  ];

  const handleSuggestedQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "What factors influence Va?": "Va (maneuvering speed) varies with aircraft weight, configuration, and center of gravity. It's the maximum speed at which full, abrupt control movement can be applied without exceeding design load limits.",
        "How did my radio work?": "Your radio communications showed good progress! You maintained clear phraseology and proper sequence. For improvement, remember to pause between transmissions and speak slightly slower for better clarity.",
        "What pilot career paths exist?": "There are many exciting paths: airline pilot, corporate aviation, flight instruction, cargo operations, emergency medical services, aerial surveying, and military aviation. Each offers unique opportunities and requirements.",
      };

      const responseText = responses[question] || "That's a great question! Based on your lesson performance, I'd recommend discussing this specific topic with your instructor during your next debrief session.";
      
      const wingmanMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'wingman',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, wingmanMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const wingmanMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your question! I'm here to help you improve your flying skills and knowledge.",
        sender: 'wingman',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, wingmanMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const resetConversation = () => {
    setMessages([]);
  };

  const renderSuggestedQuestion = (question: string) => (
    <TouchableOpacity
      key={question}
      style={styles.suggestionButton}
      onPress={() => handleSuggestedQuestion(question)}
    >
      <Text style={styles.suggestionText}>{question}</Text>
    </TouchableOpacity>
  );

  const WingmanIcon = () => (
    <View style={styles.wingmanIcon}>
      <Text style={styles.wingmanIconText}>🤖</Text>
    </View>
  );

  const renderMessageContent = (item: ChatMessage) => {
    const parts = item.text.split('\n\nVIDEO:');
    const textContent = parts[0];
    const videoContent = parts[1];

    return (
      <View>
        <Text style={styles.wingmanMessageText}>{textContent}</Text>
        {videoContent && (
          <TouchableOpacity
            style={styles.videoRecommendation}
            onPress={() => {
              const [title, url] = videoContent.split(':');
              Linking.openURL(url);
            }}
          >
            <Icon name="play" size={16} color={Colors.brand.blueAzure} />
            <Text style={styles.videoTitle}>{videoContent.split(':')[0]}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.wingmanMessage
    ]}>
      {item.sender === 'wingman' && (
        <View style={styles.messageAvatar}>
          <WingmanIcon />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.wingmanBubble
      ]}>
        {item.sender === 'user' ? (
          <Text style={styles.userMessageText}>{item.text}</Text>
        ) : (
          renderMessageContent(item)
        )}
      </View>
    </View>
  );

  const ChatContent = () => (
    <View style={styles.container}>
      {/* Header with Reset Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={resetConversation}
          style={styles.resetButton}
        >
          <Icon name="arrowLeft" size={16} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Chat</Text>
      </View>

      {messages.length === 0 ? (
        <ScrollView style={styles.welcomeContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeContent}>
            <WingmanIcon />
            <Text style={styles.welcomeTitle}>
              {mode === 'preparation' ? 'Prepare for your lesson' : 
               mode === 'career' ? 'Career guidance' : 
               'Flight debrief insights'}
            </Text>
            <Text style={styles.welcomeSubtitle}>
              {mode === 'preparation' ? `Get ready for your ${lessonTitle} lesson with personalized study tips` :
               mode === 'career' ? 'Get personalized career advice and job matching recommendations' :
               'Analyze your performance and get improvement tips'}
            </Text>
          </View>

          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggested questions:</Text>
            <View style={styles.suggestionsGrid}>
              {suggestedQuestions.map(renderSuggestedQuestion)}
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {isTyping && (
        <View style={styles.typingIndicator}>
          <WingmanIcon />
          <Text style={styles.typingText}>Wingman is typing...</Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Ask Wingman anything..."
          placeholderTextColor={Colors.neutral.gray400}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputValue.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <Icon name="arrowRight" size={20} color={inputValue.trim() ? Colors.primary.white : Colors.neutral.gray400} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ADAPTIVE RENDERING: Bottom Sheet on Phone, Adaptive Modal on iPad for Chat
  if (isTablet) {
    if (tabletLayout === 'fullScreen') {
      // iPad: Full-screen modal for immersive chat experience (like ChatGPT)
      return (
        <Modal
          visible={isOpen}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={onClose}
        >
          <SafeAreaView style={styles.tabletFullScreen}>
            {/* Header */}
            <View style={styles.tabletFullScreenHeader}>
              <TouchableOpacity onPress={onClose} style={styles.tabletBackButton}>
                <Icon name="arrow-left" size={20} color={Colors.neutral.gray600} />
              </TouchableOpacity>
              <Text style={styles.tabletFullScreenTitle}>Wingman AI Assistant</Text>
              <TouchableOpacity onPress={onClose} style={styles.tabletDoneButton}>
                <Text style={styles.tabletDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
            
            {/* Chat Content with Full Height */}
            <View style={styles.tabletChatContainer}>
              <ChatContent />
            </View>
          </SafeAreaView>
        </Modal>
      );
    } else {
      // iPad: Large centered modal for chat (like Discord/Slack)
      return (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={onClose}
        >
          <View style={styles.tabletOverlay}>
            <Pressable onPress={onClose} style={styles.tabletBackdrop} />
            
            <View style={[
              styles.tabletLargeModal,
              isLandscape && styles.tabletLargeModalLandscape
            ]}>
              {/* Header */}
              <View style={styles.tabletModalHeader}>
                <Text style={styles.tabletModalTitle}>Wingman AI Assistant</Text>
                <TouchableOpacity onPress={onClose} style={styles.tabletModalCloseButton}>
                  <Icon name="times" size={20} color={Colors.neutral.gray600} />
                </TouchableOpacity>
              </View>
              
              {/* Content */}
              <View style={styles.tabletModalContent}>
                <ChatContent />
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  }

  // Phone: Use bottom sheet (current behavior)
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Wingman AI Assistant"
      snapPoints={[0.75, 0.95]} // Reduced max height from 0.95 to 0.75
      initialSnapPoint={0}
      enablePanGesture={true}
      showHandle={true}
    >
      <ChatContent />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },

  // Tablet Full-Screen Modal Styles (Chat-Optimized)
  tabletFullScreen: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  tabletFullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  tabletBackButton: {
    padding: 8,
    marginLeft: -8,
  },
  tabletFullScreenTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    flex: 1,
    textAlign: 'center',
  },
  tabletDoneButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabletDoneText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.brand.blueAzure,
  },
  tabletChatContainer: {
    flex: 1,
  },

  // Tablet Large Modal Styles (Alternative to Full-Screen)
  tabletOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tabletBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabletLargeModal: {
    width: '85%',
    maxWidth: 700,
    height: '90%',
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  tabletLargeModalLandscape: {
    width: '75%',
    height: '95%',
  },
  tabletModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  tabletModalTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
  },
  tabletModalCloseButton: {
    padding: 4,
  },
  tabletModalContent: {
    flex: 1,
  },

  // Shared Content Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  resetButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },

  welcomeContainer: {
    flex: 1,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.neutral.gray900,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },

  wingmanIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.brand.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  wingmanIconText: {
    fontSize: 24,
  },

  suggestionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray900,
    marginBottom: 12,
  },
  suggestionsGrid: {
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray700,
  },

  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  wingmanMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    marginRight: 8,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: Colors.brand.blueAzure,
    alignSelf: 'flex-end',
  },
  wingmanBubble: {
    backgroundColor: Colors.neutral.gray100,
    alignSelf: 'flex-start',
  },
  userMessageText: {
    fontSize: 16,
    color: Colors.primary.white,
    fontFamily: Typography.fontFamily.regular,
  },
  wingmanMessageText: {
    fontSize: 16,
    color: Colors.neutral.gray900,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 22,
  },

  videoRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.brand.lightBlue,
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.brand.blueAzure,
    marginLeft: 8,
  },

  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginLeft: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.brand.blueAzure,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
});

export default AdaptiveAIModal;
