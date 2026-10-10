import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassCard = forwardRef(({ children, className = '', style = {}, opticsProps = {}, ...props }, ref) => {
    return (
        <motion.div ref={ref} className={className} style={{ ...style, position: 'relative', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }} {...props}>
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                {children}
            </div>
        </motion.div>
    );
});

export default GlassCard;
