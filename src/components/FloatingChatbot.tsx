"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, Sparkles, MessageCircle, Volume2, Bot } from "lucide-react";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm Inyxa. How can I help you today?", 
      sender: "ai",
    }
  ]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to hold the speech recognition instance so we can stop it
  const recognitionRef = useRef<any>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("inyxa_chat_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat messages", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("inyxa_chat_messages", JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  // Show floating greeting after load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide greeting if user opens chat
  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Text-to-Speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Google US English'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      utterance.pitch = 1.1;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    const newUserMessage = { id: Date.now(), text: textToSend, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsSpeaking(true);
    
    // Stop listening if we were recording
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponseText = "Thanks for reaching out! I'm processing your request now. Is there anything else you need?";
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: aiResponseText, 
          sender: "ai",
        }
      ]);
      setIsSpeaking(false);
      speakText(aiResponseText);
    }, 1500);
  };

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Safari.");
      return;
    }

    // If currently listening, stop it
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInputValue(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn("Could not start speech recognition", e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {/* The Chat UI */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[350px] sm:w-[380px] h-[550px] max-h-[75vh] flex flex-col rounded-3xl overflow-hidden bg-white/90 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] pointer-events-auto origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white/50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {/* Replaced Image with a cool gradient icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ec4899] to-[#3b82f6] flex items-center justify-center text-white shadow-inner border border-white/20 text-xl">
                  👩🏻‍💻
                </div>
                <div>
                  <h3 className="font-bold text-[#111] text-sm flex items-center gap-1">
                    Inyxa <Sparkles size={14} className="text-[#a855f7]" />
                  </h3>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors border border-gray-200 shadow-sm"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-hide bg-[#f8fafc]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "ai" ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl rounded-tl-sm p-4 border border-gray-200 shadow-sm w-full max-w-[85%] group"
                    >
                      <p className="text-[14px] leading-relaxed text-[#334155]">
                        {msg.text}
                      </p>
                      <button 
                        onClick={() => speakText(msg.text)}
                        className="mt-2 text-gray-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Read aloud"
                      >
                        <Volume2 size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-sm text-[14px] shadow-sm max-w-[85%]"
                    >
                      {msg.text}
                    </motion.div>
                  )}
                </div>
              ))}
              
              {isSpeaking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 items-center bg-white rounded-full px-4 py-2 border border-gray-200 w-fit shadow-sm"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 relative">
              {/* Listening Animation Overlay */}
              <AnimatePresence>
                {isListening && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-10"
                  >
                    <div className="flex items-center gap-1">
                      <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 bg-white rounded-full" />
                      <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1 bg-white rounded-full" />
                      <motion.div animate={{ height: ["4px", "14px", "4px"] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }} className="w-1 bg-white rounded-full" />
                      <motion.div animate={{ height: ["10px", "6px", "10px"] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-1 bg-white rounded-full" />
                    </div>
                    Listening...
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center gap-2"
              >
                <div className={`flex-1 relative bg-gray-50 rounded-full border focus-within:border-blue-300 focus-within:bg-white transition-all overflow-hidden flex items-center pr-2 ${isListening ? 'border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-gray-200'}`}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message Inyxa..."
                    className="w-full bg-transparent px-4 py-3 text-[14px] text-gray-800 outline-none placeholder:text-gray-400"
                  />
                  
                  {/* Microphone Button */}
                  <button 
                    type="button" 
                    onClick={handleSpeechRecognition}
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors relative ${
                      isListening ? 'text-red-500' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                    }`}
                    title={isListening ? "Click to stop" : "Click to speak"}
                  >
                    {isListening && (
                      <span className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-75" />
                    )}
                    <Mic size={16} className="relative z-10" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 bg-white px-4 py-2 rounded-2xl rounded-br-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-gray-100 pointer-events-auto cursor-pointer flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ec4899] to-[#3b82f6] flex items-center justify-center text-white mr-1 text-xs">
               👩🏻‍💻
             </div>
            <p className="text-[13px] font-medium text-[#111]">Hey there! 👋</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] pointer-events-auto border border-gray-100"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-gray-500" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
