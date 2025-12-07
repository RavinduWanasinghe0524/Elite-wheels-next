'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcriptPart;
          } else {
            interim += transcriptPart;
          }
        }

        setInterimTranscript(interim);
        if (final) {
          setTranscript(final);
          onSearch(final);
          setTimeout(() => setIsListening(false), 500);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onSearch]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setInterimTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const exampleCommands = [
    'Show me electric SUVs under $60,000',
    'Find hybrid cars from 2023',
    'Show sedans with good fuel economy',
    'What Toyota models do you have?',
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            Voice <span className="text-gold">Search</span>
          </h3>
          <p className="text-sm text-gray-400">
            Speak naturally to find your perfect car
          </p>
        </div>
      </div>

      {/* Microphone Button */}
      <div className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          className={`relative w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50'
              : 'bg-gradient-to-br from-gold to-yellow-600 shadow-lg shadow-gold/50'
          }`}
        >
          {isListening ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-4 border-white/30"
              />
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </>
          ) : (
            <svg className="w-16 h-16 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </motion.button>
        
        <div className="mt-4 text-sm font-medium">
          {isListening ? (
            <span className="text-red-400">🔴 Listening...</span>
          ) : (
            <span className="text-gray-400">Tap to speak</span>
          )}
        </div>
      </div>

      {/* Transcript Display */}
      <AnimatePresence>
        {(transcript || interimTranscript) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border border-gold/30 mb-6 text-center"
          >
            <div className="text-sm text-gray-400 mb-1">You said:</div>
            <div className="text-lg font-medium text-white">
              {transcript || <span className="text-gray-500">{interimTranscript}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example Commands */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-300">Try saying:</div>
        {exampleCommands.map((command, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSearch(command)}
            className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-sm text-gray-300"
          >
            💬 "{command}"
          </motion.button>
        ))}
      </div>

      {/* Browser Support Notice */}
      {typeof window !== 'undefined' && !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-200">
          ⚠️ Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
        </div>
      )}
    </div>
  );
}
