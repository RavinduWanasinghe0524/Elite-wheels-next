'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';

interface ARPreviewProps {
  carModel: string;
  carMake: string;
}

export default function ARPreview({ carModel, carMake }: ARPreviewProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showQR, setShowQR] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [carModel, carMake]);

  const generateQRCode = async () => {
    const arUrl = `${window.location.origin}/ar-view?car=${carMake}-${carModel}`;
    
    try {
      const qrDataUrl = await QRCode.toDataURL(arUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#D4AF37',
          light: '#0a1929'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('QR Code generation failed:', error);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-gold/20">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">
            AR <span className="text-gold">Preview</span>
          </h3>
          <p className="text-sm text-gray-400">
            View this car in your driveway using augmented reality
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Feature List */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '📱', text: 'Works on Mobile' },
            { icon: '🎯', text: 'Real Size Preview' },
            { icon: '360°', text: 'Walk Around View' },
            { icon: '📸', text: 'Take Photos' },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* QR Code Section */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQR(!showQR)}
          className="w-full btn-gold py-4 text-lg font-bold"
        >
          {showQR ? 'Hide QR Code' : 'View in AR'}
        </motion.button>

        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border border-gold/30"
          >
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-4">
                Scan with your mobile device to view in AR
              </p>
              
              {qrCodeUrl && (
                <div className="inline-block p-4 bg-white rounded-xl">
                  <img src={qrCodeUrl} alt="AR QR Code" className="w-64 h-64 mx-auto" />
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-4">
                Requires iOS 12+ (Safari) or Android 8+ (Chrome)
              </p>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="font-bold text-sm mb-2 text-gold">How it works:</h4>
          <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
            <li>Scan the QR code with your phone camera</li>
            <li>Grant camera permission when prompted</li>
            <li>Point your camera at a flat surface</li>
            <li>The car will appear in real size - walk around it!</li>
          </ol>
        </div>

        {/* Alternative Method */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 glass border border-gold/30 rounded-lg py-3 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Send to Phone
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 glass border border-gold/30 rounded-lg py-3 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Copy Link
          </motion.button>
        </div>
      </div>
    </div>
  );
}
