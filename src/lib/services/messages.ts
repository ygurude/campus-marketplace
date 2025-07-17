import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: string;
  // Keep existing fields for backward compatibility
  senderName?: string;
  receiverName?: string;
  createdAt?: Date;
  listingTitle?: string;
  listingImage?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  listingId?: string;
}

// Send a message
export const sendMessage = async (messageData: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
  try {
    const messageWithTimestamp = {
      ...messageData,
      timestamp: new Date(),
      isRead: false,
    };

    const docRef = await addDoc(collection(db, 'messages'), messageWithTimestamp);
    return { id: docRef.id, ...messageWithTimestamp };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get messages between two users
export const getMessagesBetweenUsers = async (userId1: string, userId2: string): Promise<Message[]> => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('senderId', 'in', [userId1, userId2]),
      where('receiverId', 'in', [userId1, userId2]),
      orderBy('timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get conversations for a user
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Get all messages where user is sender or receiver
    const q = query(
      collection(db, 'messages'),
      where('senderId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    // Group by conversation (other participant)
    const conversations = new Map<string, Conversation>();
    
    querySnapshot.docs.forEach(doc => {
      const message = { id: doc.id, ...doc.data() } as Message;
      const otherUserId = message.receiverId === userId ? message.senderId : message.receiverId;
      
      if (!conversations.has(otherUserId)) {
        conversations.set(otherUserId, {
          id: otherUserId,
          participants: [userId, otherUserId],
          lastMessage: message,
          unreadCount: 0,
          listingId: message.listingId,
        });
      }
    });

    return Array.from(conversations.values());
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  try {
    const docRef = doc(db, 'messages', messageId);
    await updateDoc(docRef, { isRead: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get unread message count for a user
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('receiverId', '==', userId),
      where('isRead', '==', false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Real-time message listener
export const subscribeToMessages = (
  userId: string, 
  callback: (messages: Message[]) => void
) => {
  const q = query(
    collection(db, 'messages'),
    where('receiverId', '==', userId),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
    callback(messages);
  });
}; 