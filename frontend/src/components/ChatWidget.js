import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Need help booking your luxury ride? Chat with us now!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { id: 1, text: 'Book a ride', icon: Calendar, action: () => navigate('/booking') },
    { id: 2, text: 'Call us', icon: Phone, action: () => window.location.href = 'tel:+19298678846' },
    { id: 3, text: 'View services', action: () => navigate('/services') },
  ];

  const botResponses = {
    'book': 'I can help you book a ride! Click the "Book a ride" button below or visit our booking page. We offer hourly chauffeur service starting at $75/hour with a 2-hour minimum.',
    'price': 'Our hourly rate is $75/hour with a 2-hour minimum booking. A 50% deposit is required upfront, and the remaining balance is due after service.',
    'hours': 'We are available 24/7! You can book a ride anytime that suits your schedule.',
    'services': 'We offer: Hourly Chauffeur Service, Airport Transfers, Special Events, Business Travel, and Personal Use. All services are billed hourly.',
    'payment': 'We accept payment via credit card through our secure Stripe checkout. A 50% deposit is required when booking.',
    'vehicle': 'We use a 2025 Black Toyota Sienna with premium leather interior, seating for up to 7 passengers, climate control, and complimentary bottled water.',
    'contact': 'You can reach us at (929) 867-8846 or email info@atlantahourlyride.com. We\'re available 24/7!',
    'cancel': 'Cancellations require 24 hours notice. Please contact us at (929) 867-8846 for cancellation assistance.',
    'default': 'Thank you for your message! For immediate assistance, please call us at (929) 867-8846 or book directly through our website. How else can I help you today?'
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('reservation')) {
      return botResponses.book;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
      return botResponses.price;
    } else if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('available')) {
      return botResponses.hours;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
      return botResponses.services;
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('deposit')) {
      return botResponses.payment;
    } else if (lowerMessage.includes('vehicle') || lowerMessage.includes('car') || lowerMessage.includes('sienna')) {
      return botResponses.vehicle;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
      return botResponses.contact;
    } else if (lowerMessage.includes('cancel')) {
      return botResponses.cancel;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to Atlanta Luxury Chauffeur Service. How can I assist you today?";
    }
    
    return botResponses.default;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    if (reply.action) {
      reply.action();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-testid="chat-widget-button"
          className="fixed bottom-6 right-6 z-50 bg-[#1B1B1B] text-white p-4 rounded-full shadow-2xl hover:bg-[#2C2C2C] transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B89D62] rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          data-testid="chat-widget-window"
          className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-[#1B1B1B]/10"
          style={{ maxWidth: 'calc(100vw - 3rem)' }}
        >
          {/* Header */}
          <div className="bg-[#1B1B1B] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-playfair text-lg">Live Chat</h3>
                <p className="text-xs text-white/70 font-manrope">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              data-testid="chat-widget-close"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F0]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#1B1B1B] text-white'
                      : 'bg-white text-[#1B1B1B] border border-[#1B1B1B]/10'
                  }`}
                >
                  <p className="text-sm font-manrope">{message.text}</p>
                  <p className="text-xs mt-1 opacity-60 font-manrope">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-[#1B1B1B]/10 bg-white">
              <p className="text-xs text-[#2C2C2C] mb-2 font-manrope uppercase tracking-wider">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    className="flex items-center px-3 py-2 bg-[#F5F5F0] hover:bg-[#E4E4DE] text-[#1B1B1B] text-sm rounded border border-[#1B1B1B]/10 transition-colors font-manrope"
                  >
                    {reply.icon && <reply.icon className="w-3 h-3 mr-1.5" />}
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#1B1B1B]/10 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                data-testid="chat-widget-input"
                className="flex-1 px-4 py-2 border border-[#1B1B1B]/20 rounded focus:outline-none focus:border-[#B89D62] font-manrope text-sm"
              />
              <button
                type="submit"
                data-testid="chat-widget-send"
                className="bg-[#1B1B1B] text-white p-2 rounded hover:bg-[#2C2C2C] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
