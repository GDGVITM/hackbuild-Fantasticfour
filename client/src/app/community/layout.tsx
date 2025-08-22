"use client";

import Link from "next/link";
import React from "react";
import {
  Users,
  MessageSquare,
  Bell,
  Search,
  Plus,
  Home,
  Hash,
  ArrowRight,
  Menu,
  X,
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  ChevronLeft
} from "lucide-react";

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isActive?: boolean;
}

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'General Discussion',
    lastMessage: 'Anyone working on DSA problems today?',
    timestamp: '2m ago',
    unread: 3,
    isActive: true
  },
  {
    id: '2',
    name: 'Placement Updates',
    lastMessage: 'Google interviews starting next week!',
    timestamp: '5m ago',
    unread: 12
  },
  {
    id: '3',
    name: 'Study Groups',
    lastMessage: 'Machine Learning study group at 7 PM',
    timestamp: '10m ago',
    unread: 0
  },
  {
    id: '4',
    name: 'Project Collaboration',
    lastMessage: 'Need React developers for final year project',
    timestamp: '1h ago',
    unread: 2
  },
  {
    id: '5',
    name: 'Mentorship',
    lastMessage: 'Thank you for the career guidance!',
    timestamp: '2h ago',
    unread: 0
  },
  {
    id: '6',
    name: 'Tech News',
    lastMessage: 'OpenAI releases new updates',
    timestamp: '3h ago',
    unread: 1
  }
];

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'Alex Kumar',
    message: 'Has anyone started preparing for the Google interviews?',
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: '2',
    user: 'You',
    message: 'Yes! Been practicing system design problems. Any specific topics we should focus on?',
    timestamp: '10:32 AM',
    isOwn: true
  },
  {
    id: '3',
    user: 'Priya Singh',
    message: 'I heard they focus a lot on algorithms and data structures. LeetCode medium/hard problems are essential.',
    timestamp: '10:35 AM',
    isOwn: false
  },
  {
    id: '4',
    user: 'Alex Kumar',
    message: 'Thanks! Also, don\'t forget about behavioral questions. They\'re equally important.',
    timestamp: '10:37 AM',
    isOwn: false
  }
];

type Props = {
  children?: React.ReactNode;
};

export default function CommunityLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(mockChatRooms[0]);
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#edf6f9]">
      {/* Header */}
      <header className="bg-[#006d77] border-b border-[#83c5be]/20 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile menu button & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#83c5be] rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#006d77]" />
                </div>
                <span className="text-lg font-bold text-white">EduMitra</span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-white/70 mr-2" />
                <input
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-white/70 text-sm outline-none w-32"
                />
              </div>
              
              <button className="relative p-2 text-white hover:bg-white/10 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e29578] rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              <Link
                href="/"
                className="p-2 text-white hover:bg-white/10 rounded-lg"
              >
                <Home className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Hidden on mobile, slides in when opened */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-[#83c5be]/20 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-[#edf6f9] bg-[#83c5be]/5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-[#006d77]">Chat Rooms</h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                <button className="p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Search within rooms */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#83c5be] w-4 h-4" />
              <input
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#83c5be]/30 rounded-lg text-sm text-[#006d77] focus:ring-2 focus:ring-[#006d77] focus:border-[#006d77]"
              />
            </div>
          </div>

          {/* Chat Rooms List */}
          <div className="flex-1 overflow-y-auto">
            {mockChatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  setSidebarOpen(false); // Close sidebar on mobile when room is selected
                }}
                className={`w-full p-4 text-left border-b border-[#edf6f9] hover:bg-[#edf6f9] transition-colors ${
                  selectedRoom.id === room.id ? 'bg-[#83c5be]/10 border-r-2 border-r-[#006d77]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-[#83c5be]" />
                    <span className="font-medium text-[#006d77] text-sm">{room.name}</span>
                  </div>
                  {room.unread > 0 && (
                    <span className="w-5 h-5 bg-[#e29578] text-white text-xs rounded-full flex items-center justify-center">
                      {room.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#83c5be] mb-1 line-clamp-2">{room.lastMessage}</p>
                <span className="text-xs text-[#83c5be]/70">{room.timestamp}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-[#edf6f9] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#83c5be]" />
                  <h1 className="text-lg font-bold text-[#006d77]">{selectedRoom.name}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#83c5be] bg-[#edf6f9] px-2 py-1 rounded-full">
                  24 members
                </span>
                <button className="p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg ${msg.isOwn ? 'order-2' : ''}`}>
                  {!msg.isOwn && (
                    <p className="text-xs font-medium text-[#83c5be] mb-1">{msg.user}</p>
                  )}
                  <div className={`px-3 py-2 rounded-lg ${
                    msg.isOwn 
                      ? 'bg-[#006d77] text-white rounded-br-sm' 
                      : 'bg-[#edf6f9] text-[#006d77] rounded-bl-sm'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className={`text-xs text-[#83c5be]/70 mt-1 ${msg.isOwn ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-[#edf6f9] bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#83c5be] hover:bg-[#edf6f9] rounded-lg">
                <Paperclip className="w-4 h-4" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 pr-10 border border-[#83c5be]/30 rounded-lg text-sm text-[#006d77] focus:ring-2 focus:ring-[#006d77] focus:border-[#006d77]"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#83c5be] hover:text-[#006d77]">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={sendMessage}
                className="p-2 bg-[#006d77] text-white rounded-lg hover:bg-[#006d77]/90 disabled:opacity-50"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
