import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PopupSystemActiveProps {
  isVisible: boolean;
  onClose: () => void;
  onCTA: () => void;
}

export default function PopupSystemActive({
  isVisible,
  onClose,
  onCTA
}: PopupSystemActiveProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50 max-w-sm"
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div
            className="rounded-lg p-6 border relative overflow-hidden"
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
            {/* Заголовок */}
            <h3 className="text-sm font-semibold text-white mb-3">
              Кажется вы зависли
            </h3>

            {/* Текст */}
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Вернитесь к обучению.<br />
              Места в NEIROMASTER 5.0 постепенно занимают.
            </p>

            {/* CTA кнопка */}
            <motion.button
              onClick={onCTA}
              className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 mb-3"
              style={{
                background: '#3B82F6',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Занять место
            </motion.button>

            {/* Крестик для закрытия */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
