/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Metals
        'gold': '#FFD700',
        'platinum': '#E5E4E2',
        'rose-gold': '#E0BFB8',
        'silver': '#C0C0C0',
        'bronze': '#CD7F32',
        
        // Luxury Gems
        'diamond': '#B9F2FF',
        'emerald': '#50C878',
        'ruby': '#E0115F',
        'sapphire': '#0F52BA',
        'amethyst': '#9966CC',
        
        // Luxury Development Colors
        'luxury-black': '#0a0a0a',
        'luxury-gray': '#2d2d2d',
        'luxury-white': '#F8F8F8',
        'luxury-cream': '#F5F5DC',
        
        // Premium Accents
        'champagne': '#F7E7CE',
        'ivory': '#FFFFF0',
        'pearl': '#F8F6FF',
        'onyx': '#0F0F0F',
        
        // Original colors for compatibility
        'terminal-green': '#00ff41',
        'terminal-blue': '#0080ff',
        'terminal-pink': '#ff0080',
        'terminal-yellow': '#ffff00',
        'terminal-purple': '#ff00ff',
        'code-black': '#0a0a0a',
        'code-gray': '#1a1a1a',
        'aura-purple': '#667eea',
        'aura-pink': '#764ba2',
        'aura-blue': '#4facfe',
        'aura-cyan': '#00f2fe',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-luxury': 'float-luxury 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-luxury': 'glow-luxury 3s ease-in-out infinite alternate',
        'typing': 'typing 3s steps(40, end) infinite',
        'blink': 'blink 1s infinite',
        'pulse-luxury': 'pulse-luxury 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-luxury': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)' 
          },
          '25%': { 
            transform: 'translateY(-10px) rotate(1deg)' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(0deg)' 
          },
          '75%': { 
            transform: 'translateY(-10px) rotate(-1deg)' 
          }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' },
        },
        'glow-luxury': {
          '0%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.4)' 
          }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'pulse-luxury': {
          '0%, 100%': { 
            opacity: '0.8', 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' 
          },
          '50%': { 
            opacity: '1', 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' 
          }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'luxury': ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 80px rgba(0, 0, 0, 0.5), 0 10px 40px rgba(255, 215, 0, 0.2)',
        'luxury-lg': '0 32px 128px rgba(0, 0, 0, 0.6), 0 16px 64px rgba(255, 215, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
