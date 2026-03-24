import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PopupPlaceTakenProps {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  city: string;
}

export default function PopupPlaceTaken({
  isVisible,
  onClose,
  name,
  city
}: PopupPlaceTakenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div
            className="rounded-lg p-4 max-w-sm border relative overflow-hidden"
            style={{
              background: 'rgba(10, 10, 14, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              boxShadow: `
                0 0 40px rgba(59, 130, 246, 0.25),
                inset 0 0 30px rgba(59, 130, 246, 0.12)
              `
            }}
          >
            {/* Пульсирующая точка слева */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#22D3EE',
                  boxShadow: '0 0 12px rgba(34, 211, 238, 0.8)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(34, 211, 238, 0.8)',
                    '0 0 20px rgba(34, 211, 238, 1)',
                    '0 0 12px rgba(34, 211, 238, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Текст */}
            <div className="ml-6">
              <p className="text-xs text-gray-400 mb-1">Место занято</p>
              <p className="text-sm font-semibold text-white">
                {name}
                <span className="text-xs text-gray-500 block mt-0.5">
                  из {city}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                только что занял место в NEIROMASTER 5.0
              </p>
            </div>

            {/* Крестик для закрытия */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
