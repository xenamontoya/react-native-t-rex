import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { Icon, Colors, Typography } from '../../components/src';
import BottomSheet from './BottomSheet';

interface AIInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  mode?: 'insights' | 'preparation' | 'career';
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

const AIInsightsModal: React.FC<AIInsightsModalProps> = ({ 
  isOpen, 
  onClose, 
  lessonTitle, 
  mode = 'insights' 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = mode === 'preparation' ? [
    "What factors influence Va?",
    "Class B airspace requirements?",
    "Pre-flight weather planning?",
    "Radio phraseology tips?",
    "Common student mistakes?",
    "Emergency procedures?",
    "Pattern entry techniques?",
    "FAR Part 91 basics?"
  ] : mode === 'career' ? [
    "What pilot career paths exist?",
    "How to build flight hours?",
    "Commercial license requirements?",
    "Best aviation schools?",
    "Entry-level pilot positions?",
    "Airline hiring requirements?",
    "Corporate pilot opportunities?",
    "Flight instructor benefits?"
  ] : [
    "How did my radio work?",
    "Airspeed control tips?",
    "Landing technique notes?",
    "Pattern positioning?",
    "Safety improvements?",
    "Next lesson focus?",
    "Study recommendations?",
    "Performance vs standards?"
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

    // Simulate Wingman AI response
    setTimeout(() => {
      const preparationResponses: Record<string, string> = {
        "What factors influence Va?": "Maneuvering Speed (Va) is key for safe flight operations! ✈️ Here's what influences it:\n\n1️⃣ **Aircraft Weight** - Va increases with weight. Formula: Va(new) = Va(max) × √(Weight(new)/Weight(max))\n\n2️⃣ **Aircraft Design** - Each aircraft has specific structural limits determined during certification\n\n3️⃣ **Turbulence Considerations** - Flying at or below Va protects against structural damage\n\n💡 **Student Tip**: Va isn't on your airspeed indicator and changes with weight. Always check your POH for specific values!",
        
        "Class B airspace requirements?": "Class B is the **Big & Busy** airspace around major airports! 🏢\n\n✅ **Entry Requirements**:\n• Explicit ATC clearance (must hear \"Cleared into Class Bravo\")\n• Mode C transponder + ADS-B Out\n• Private pilot certificate (or student with endorsement)\n• Two-way radio communication\n\n📏 **Structure**: Surface to ~10,000' MSL in upside-down wedding cake layers\n\n🧠 **Memory Trick**: Class B = Big & Busy airports\n\n⚠️ **Critical**: No entry without clearance - even if talking to ATC!",
        
        "Pre-flight weather planning?": "Weather planning is crucial for safe flight operations! 🌤️\n\n✅ **Planning Steps**:\n• Check METAR/TAF for departure, destination, and alternate\n• Review radar and satellite imagery for trends\n• Understand weather minimums for your flight rules\n• Plan fuel reserves for weather delays\n• Have alternate plans ready\n\n📱 **Resources**: Aviation Weather Center, ForeFlight, 1-800-WX-BRIEF\n\n🎯 **Student Focus**: Always file a flight plan and get weather briefings!",
        
        "Radio phraseology tips?": "Clear communication keeps everyone safe! 📻\n\n🔤 **Standard Format**:\n1. **Who** you're calling\n2. **Who** you are  \n3. **Where** you are\n4. **What** you want\n\n💡 **Practice Tips**:\n• Listen to LiveATC.net for real examples\n• Speak clearly and at normal pace\n• Use standard phraseology from AIM\n• Think before you key the mic\n\n🧠 **Memory Aid**: Who-Who-Where-What keeps your calls professional!",
        
        "Common student mistakes?": "Every pilot has made these - learn from others! ⚠️\n\n❌ **Common Issues**:\n• Fixating on instruments vs outside references\n• Over-controlling during approach\n• Forgetting area clearing before maneuvers  \n• Rushing through checklists\n• Not maintaining sterile cockpit\n\n✅ **Solutions**: Develop good habits early, practice consistently, and communicate with your CFI about challenges!",
        
        "Emergency procedures?": "Emergency preparedness saves lives! 🚨\n\n🔥 **Engine Failure Steps**:\n1. **Best glide airspeed** (memorize this!)\n2. **Field selection** - pick early, stick with it\n3. **Checklist** - try restart if time permits\n4. **Communication** - 7700, Mayday, position\n\n📚 **Study Focus**: Memory items vs reference items, decision-making process\n\n🎯 **Practice**: Chair fly emergencies regularly!",
        
        "Pattern entry techniques?": "Standard entries keep traffic predictable! 🛬\n\n✈️ **Entry Types**:\n• **45° to downwind** - most common, from non-pattern side\n• **Straight-in** - only when traffic permits\n• **Teardrop** - from pattern side\n\n📻 **Always announce**: Position, intentions, airport name\n\n🔍 **Scan constantly** - most midairs happen in the pattern\n\n💡 **Key**: Be predictable, follow standard procedures!",
        
        "FAR Part 91 basics?": "Part 91 covers general operating rules! 📖\n\n⭐ **Key Sections**:\n• 91.3 - Pilot in command authority\n• 91.103 - Preflight preparation requirements  \n• 91.113 - Right-of-way rules\n• 91.155 - VFR weather minimums\n• 91.209 - Equipment requirements\n\n🎯 **Student Focus**: These are testable and affect every flight you'll make!\n\n💡 **Memory**: Regulations exist for safety - understand the why behind each rule."
      };

      const careerResponses: Record<string, string> = {
        "What pilot career paths exist?": "Aviation offers diverse and exciting career opportunities! ✈️\n\n🛩️ **Career Paths**:\n• **Airlines** - Regional to Major carriers\n• **Corporate/Charter** - Business aviation\n• **Cargo** - FedEx, UPS, freight companies\n• **Flight Instruction** - Train the next generation\n• **Government** - Military, ATC, safety inspectors\n• **Specialized** - Aerial survey, firefighting, EMS\n\n💡 **Growth Outlook**: Strong pilot demand through 2030+\n🎯 **Start Planning**: Build hours strategically for your target career!",
        
        "How to build flight hours?": "Hour building is crucial for career advancement! ⏰\n\n🏗️ **Effective Strategies**:\n• **Flight Instructing** - Get paid while building time\n• **Pipeline Programs** - Airline partnerships with schools\n• **Charter/135 Operations** - Multi-engine experience\n• **Aerial Survey** - Cross-country time building\n• **Banner Towing** - Seasonal but good hours\n• **Volunteer Flying** - Angel Flight, disaster relief\n\n💰 **Smart Approach**: Combine income with hour building\n🎯 **Target**: 1,500 hours for ATP certificate",
        
        "Commercial license requirements?": "Your Commercial Pilot License opens career doors! 🎖️\n\n📋 **Requirements**:\n• **Age**: 18 years minimum\n• **Hours**: 250 total flight time\n• **Cross-Country**: 50+ hours PIC\n• **Complex/TAA**: 10 hours training\n• **Night**: 10 hours including 5 hours solo\n• **Medical**: Second-class minimum\n• **Written & Checkride**: Pass both exams\n\n💡 **Pro Tip**: Start working toward these hours during private training\n🎯 **Timeline**: Typically 6-12 months after private license",
        
        "Best aviation schools?": "Choose the right school for your career goals! 🏫\n\n🏆 **Top Programs**:\n• **University Programs** - Embry-Riddle, UND, Purdue\n• **Professional Schools** - ATP, CAE, FlightSafety\n• **Regional Options** - Local Part 141 schools\n• **Accelerated Programs** - 0-1500 hours in 18-24 months\n\n🔍 **Evaluation Criteria**:\n• Fleet condition and variety\n• Instructor quality and turnover\n• Job placement rates\n• Financing options\n• Location and weather\n\n💡 **Visit First**: Tour facilities and talk to current students!",
        
        "Entry-level pilot positions?": "Break into aviation with these entry-level opportunities! 🚀\n\n✅ **First Jobs** (Low-time friendly):\n• **Certified Flight Instructor** - 250+ hours\n• **Banner Towing** - 500+ hours\n• **Pipeline Patrol** - 500+ hours\n• **Aerial Survey** - 500-750+ hours\n• **Charter Co-pilot** - 500-1000+ hours\n• **Regional Airlines** - 1,500+ hours (R-ATP possible at 1,250)\n\n💰 **Pay Range**: $30-60K starting\n📈 **Growth**: Each position builds toward airline career\n🎯 **Strategy**: Focus on multi-engine and turbine time",
        
        "Airline hiring requirements?": "Airlines are actively hiring qualified pilots! 🛫\n\n📊 **Typical Requirements**:\n• **ATP Certificate** - 1,500 hours minimum\n• **Multi-Engine**: 500+ hours preferred\n• **Turbine Time**: 100+ hours preferred\n• **Clean Record**: No major violations/incidents\n• **College Degree**: Preferred by majors\n• **First Class Medical**: Required\n\n✈️ **Major vs Regional**:\n• **Regional**: $50-80K starting, faster hiring\n• **Major**: $80-150K+ starting, more competitive\n\n🎯 **Hot Tip**: Consider regional as stepping stone to majors!",
        
        "Corporate pilot opportunities?": "Corporate aviation offers excellent career paths! 🏢\n\n💼 **Advantages**:\n• **Better Schedule** - More predictable than airlines\n• **Variety** - Different destinations, aircraft types\n• **Relationships** - Work with same passengers\n• **Growth** - Advance to chief pilot, management\n• **Equipment** - Often newer, well-maintained aircraft\n\n📋 **Typical Requirements**:\n• 1,000-3,000+ hours depending on operation\n• Turbine experience preferred\n• Professional appearance and demeanor\n• Clean driving and flying record\n\n💰 **Compensation**: $60-200K+ depending on experience and operation",
        
        "Flight instructor benefits?": "Flight instructing builds careers and skills! 👨‍🏫\n\n🌟 **Career Benefits**:\n• **Paid Hour Building** - Earn while you learn\n• **Teaching Skills** - Valuable for any career\n• **Deep Knowledge** - Master fundamentals\n• **Network Building** - Connect with industry professionals\n• **Flexible Schedule** - Part-time options available\n• **Job Security** - Always in demand\n\n💡 **Progression Path**:\nCFI → CFII → MEI → Airline Interview Prep\n\n🎯 **Pro Tip**: Great instructors often get first shot at airline partnerships!"
      };

      const insightResponses: Record<string, string> = {
        "How did my radio work?": "Your radio technique showed good improvement! 📻\n\n✅ **Strengths**: Clear pronunciation and proper format\n❌ **Areas to improve**: Reduce filler words like \"uh\" and \"um\"\n\n💡 **Practice Tips**:\n• Listen to LiveATC.net for real examples\n• Think before keying the mic\n• Use standard phraseology from AIM\n\n🎯 **Next Goal**: Work on confidence and timing with your calls!",
        
        "Airspeed control tips?": "Airspeed control is fundamental to safe flying! ⚡\n\n🎯 **Key Techniques**:\n• **Power for altitude, elevator for airspeed** (in cruise)\n• **Small corrections** - don't chase the needle\n• **Trim religiously** - reduces workload\n• **Scan outside, then instruments**\n\n📊 **Your Performance**: Above average for this stage\n💡 **Focus**: Practice in different configurations (clean, approach, landing)",
        
        "Landing technique notes?": "Landing technique is looking solid! 🛬\n\n✅ **Strengths**: Good approach stabilization and flare initiation\n⚠️ **Watch**: Tendency to balloon slightly in flare\n\n🔧 **Improvement Tips**:\n• Focus on **aim point control** on approach\n• **Gradual** power reduction in flare\n• **Eyes down the runway** during roundout\n\n🎯 **Next Session**: Practice with different wind conditions",
        
        "Pattern positioning?": "Your pattern work shows good progress! 🔄\n\n✅ **Doing Well**:\n• Consistent pattern altitude\n• Good traffic scanning habits\n• Proper radio position reports\n\n📐 **Spacing Notes**: Sometimes wide on downwind - use ground references\n💡 **Tip**: Aim for 1/2 to 3/4 mile from runway on downwind",
        
        "Safety improvements?": "Safety mindset is developing well! 🛡️\n\n⭐ **Strengths**:\n• Good preflight inspection technique\n• Conservative weather decisions\n• Proper clearing procedures\n\n🎯 **Continue Working On**:\n• Dividing attention during pattern work\n• Go-around decision making\n• Emergency procedure confidence",
        
        "Next lesson focus?": "Based on today's performance, next lesson priorities: 📋\n\n1️⃣ **Primary**: Crosswind landing technique\n2️⃣ **Secondary**: Short field procedures\n3️⃣ **Review**: Radio phraseology refinement\n\n📚 **Homework**: Study crosswind landing theory and chair fly the procedures\n🎯 **Goal**: Build confidence in varying wind conditions",
        
        "Study recommendations?": "Recommended study resources for your stage: 📚\n\n📖 **Books**: \n• Rod Machado's Private Pilot Handbook\n• Jeppesen Private Pilot Manual\n\n📱 **Apps**:\n• Sporty's Study Buddy for written prep\n• ForeFlight for chart familiarity\n\n🎥 **Videos**: MzeroA and Flight Training Central on YouTube\n💻 **Online**: Join r/flying community for discussions",
        
        "Performance vs standards?": "You're tracking well against ACS standards! 📊\n\n🎯 **Current Status**:\n• **Above Standard**: Weather decision-making, preflight procedures\n• **Meeting Standard**: Basic aircraft control, radio work\n• **Developing**: Pattern precision, crosswind technique\n\n📈 **Progress**: Normal learning curve for this stage\n💡 **Outlook**: On track for checkride success with continued practice!"
      };

      const responses = mode === 'preparation' ? preparationResponses : mode === 'career' ? careerResponses : insightResponses;

      let responseText = responses[question] || "That's a great question! Based on your lesson performance, I'd recommend discussing this specific topic with your instructor during your next debrief session. They can provide personalized guidance based on your individual progress and learning style.";
      
      // Add video for specific topics based on mode
      if (mode === 'preparation') {
        if (question === "What factors influence Va?") {
          responseText += `\n\nVIDEO:Understanding Maneuvering Speed (Va):https://youtu.be/tPiBZMRxU3o?si=OZ2iN8xdrPM2FF4a:Deep dive into Va calculations and safety applications`;
        } else if (question === "Class B airspace requirements?") {
          responseText += `\n\nVIDEO:Flying in Class B Airspace:https://youtu.be/tPiBZMRxU3o?si=OZ2iN8xdrPM2FF4a:Complete guide to Class B operations and requirements`;
        }
      }

      const wingmanMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'wingman',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, wingmanMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay to feel more natural
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

    // Simulate Wingman AI response
    setTimeout(() => {
      const wingmanMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your question! I'm here to help with insights about your flight training. For the most personalized guidance, I recommend discussing specific scenarios with your instructor. Is there a particular aspect of your recent lesson you'd like to explore further?",
        sender: 'wingman',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, wingmanMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const resetConversation = () => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
  };

  // Custom Wingman AI Icon Component
  const WingmanIcon = () => (
    <View style={styles.wingmanIcon}>
      <Icon name="robot" size={16} color={Colors.brand.blueAzure} />
    </View>
  );

  // Video Recommendation Component
  const VideoRecommendation = ({ title, url, description }: VideoRecommendation) => (
    <TouchableOpacity 
      style={styles.videoRecommendation}
      onPress={() => {
        Linking.openURL(url).catch(() => {
          Alert.alert('Error', 'Unable to open video link');
        });
      }}
    >
      <View style={styles.videoThumbnail}>
        <Icon name="play" size={16} color={Colors.neutral.gray600} />
      </View>
      <View style={styles.videoContent}>
        <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
        {description && (
          <Text style={styles.videoDescription} numberOfLines={1}>{description}</Text>
        )}
        <View style={styles.videoLink}>
          <Icon name="external-link" size={12} color={Colors.status.info} />
          <Text style={styles.videoLinkText}>Watch on YouTube</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Function to render message with potential video content
  const renderMessageContent = (message: ChatMessage) => {
    const parts = message.text.split('\n\nVIDEO:');
    const textPart = parts[0];
    
    return (
      <View>
        <Text style={styles.messageText}>{textPart}</Text>
        {parts.slice(1).map((videoPart, index) => {
          const [title, url, description] = videoPart.split(':');
          return (
            <VideoRecommendation
              key={index}
              title={title}
              url={url}
              description={description}
            />
          );
        })}
      </View>
    );
  };

  const renderSuggestedQuestion = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.suggestedQuestionButton}
      onPress={() => handleSuggestedQuestion(item)}
    >
      <Text style={styles.suggestedQuestionText}>{item}</Text>
    </TouchableOpacity>
  );

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

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Wingman AI Assistant"
      snapPoints={[0.95]}
      initialSnapPoint={0}
      enablePanGesture={true}
      showHandle={true}
    >
      <View style={styles.container}>
        {/* Header with Reset Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={resetConversation}
            style={styles.resetButton}
          >
            <Icon name="arrow-left" size={16} color={Colors.neutral.gray600} />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <View style={styles.chatContainer}>
          {messages.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeMessage}>
                <WingmanIcon />
                <Text style={styles.welcomeText}>
                  {mode === 'preparation' 
                    ? `👋 Hi! I'm Wingman, your AI flight instructor. I'm here to help you prepare for your upcoming ${lessonTitle} lesson. Ask me about regulations, procedures, or any aviation concepts you'd like to review!`
                    : mode === 'career'
                    ? `👋 Hi! I'm Wingman, your AI career advisor. I'm here to help you navigate your aviation career path. Ask me about pilot careers, training requirements, or how to build your professional aviation future!`
                    : `👋 Hi! I'm Wingman, your AI flight instructor. I can provide insights and analysis about your ${lessonTitle} lesson performance. What would you like to discuss about your flying?`
                  }
                </Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
            />
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.messageAvatar}>
                <WingmanIcon />
              </View>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, { animationDelay: 0 }]} />
                  <View style={[styles.typingDot, { animationDelay: 100 }]} />
                  <View style={[styles.typingDot, { animationDelay: 200 }]} />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Suggested Questions */}
          <View style={styles.suggestedQuestionsContainer}>
            <Text style={styles.suggestedQuestionsLabel}>Suggested questions:</Text>
            <FlatList
              data={suggestedQuestions}
              renderItem={renderSuggestedQuestion}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestedQuestionsList}
            />
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Ask Wingman about your flight training..."
                placeholderTextColor={Colors.neutral.gray500}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={!inputValue.trim()}
                style={[
                  styles.sendButton,
                  !inputValue.trim() && styles.sendButtonDisabled
                ]}
              >
                <Icon 
                  name="paper-plane" 
                  size={16} 
                  color={!inputValue.trim() ? Colors.neutral.gray400 : Colors.neutral.white} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  resetButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  welcomeMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  welcomeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral.gray800,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
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
    borderRadius: 12,
    padding: 12,
  },
  userBubble: {
    backgroundColor: Colors.brand.orangeVivid,
    marginLeft: 'auto',
  },
  wingmanBubble: {
    backgroundColor: Colors.neutral.gray100,
  },
  userMessageText: {
    fontSize: 14,
    color: Colors.neutral.white,
  },
  messageText: {
    fontSize: 14,
    color: Colors.neutral.gray800,
    lineHeight: 20,
  },
  wingmanIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral.black,
    borderWidth: 2,
    borderColor: Colors.brand.blueAzure,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoRecommendation: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  videoThumbnail: {
    width: 64,
    height: 48,
    backgroundColor: Colors.neutral.gray300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  videoContent: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray900,
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 12,
    color: Colors.neutral.gray600,
    marginBottom: 8,
  },
  videoLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoLinkText: {
    fontSize: 12,
    color: Colors.status.info,
    marginLeft: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral.gray400,
    marginHorizontal: 2,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingTop: 16,
  },
  suggestedQuestionsContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  suggestedQuestionsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray700,
    marginBottom: 12,
  },
  suggestedQuestionsList: {
    paddingRight: 16,
  },
  suggestedQuestionButton: {
    backgroundColor: Colors.neutral.gray50,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  suggestedQuestionText: {
    fontSize: 14,
    color: Colors.neutral.gray600,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    paddingTop: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.neutral.gray900,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.brand.orangeVivid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
});

export default AIInsightsModal;
