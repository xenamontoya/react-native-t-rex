import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { Icon } from '../components/Icons';
import { Colors, Typography } from '../../components/src';

export default function CommunityScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');

  const handleBackPress = () => {
    navigation?.goBack();
  };

  // Mock data for community posts
  const communityPosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/80?seed=sarah',
      role: 'Commercial Pilot',
      airline: 'United Airlines',
      timeAgo: '2 hours ago',
      content: 'Just completed my first international flight as Captain! The sunrise over the Atlantic was absolutely breathtaking. Still can\'t believe this is my job 🌅✈️',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&q=80',
      likes: 24,
      comments: 8,
      isLiked: false,
      tags: ['milestone', 'captain', 'international']
    },
    {
      id: 2,
      author: 'Mike Rodriguez',
      avatar: 'https://i.pravatar.cc/80?seed=mike',
      role: 'Flight Instructor',
      airline: 'ATP Flight School',
      timeAgo: '4 hours ago',
      content: 'Question for fellow CFIs: What\'s your best technique for teaching crosswind landings to nervous students? I\'ve found that starting with just taxi work in crosswinds helps build confidence.',
      likes: 12,
      comments: 15,
      isLiked: true,
      tags: ['cfi', 'teaching', 'crosswind']
    },
    {
      id: 3,
      author: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/80?seed=emily',
      role: 'Student Pilot',
      airline: 'Local Flight School',
      timeAgo: '6 hours ago',
      content: 'Solo cross-country complete! 150nm from KPAO to KSTS and back. Navigation was spot on thanks to all the practice. Next stop: checkride prep! 🛩️',
      likes: 18,
      comments: 6,
      isLiked: false,
      tags: ['student', 'solo', 'cross-country']
    }
  ];

  const handleLike = (postId: number) => {
    Alert.alert('Like', `Liked post ${postId}`);
  };

  const handleComment = (postId: number) => {
    Alert.alert('Comment', `Comment on post ${postId}`);
  };

  const handleShare = (postId: number) => {
    Alert.alert('Share', `Share post ${postId}`);
  };

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.authorRole}>{post.role} • {post.airline}</Text>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>

      {/* Post Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {post.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
          <Icon 
            name="heart" 
            size={20} 
            color={post.isLiked ? Colors.status.error : Colors.neutral.gray500} 
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
          <Icon name="comments" size={20} color={Colors.neutral.gray500} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(post.id)}>
          <Icon name="share" size={20} color={Colors.neutral.gray500} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrowLeft" size={20} color={Colors.neutral.gray600} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSubtitle}>Connect with pilots worldwide</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color={Colors.primary.white} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={Colors.neutral.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts, topics, or pilots..."
            placeholderTextColor={Colors.neutral.gray500}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Posts Feed */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {communityPosts.map(renderPost)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.primary.white,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.accent.electricBlue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.primary.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 128,
  },
  postCard: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.semibold,
    color: Colors.neutral.gray900,
  },
  authorRole: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray600,
    marginTop: 2,
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray500,
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.neutral.gray900,
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: Colors.accent.electricBlue + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.accent.electricBlue,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.neutral.gray500,
  },
  likedText: {
    color: Colors.status.error,
  },
});




