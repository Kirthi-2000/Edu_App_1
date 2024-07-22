import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaTrophy, FaMobileAlt, FaSmile } from 'react-icons/fa';
import './AnimatedText.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const iconStyle = { color: 'red' };

const AnimatedText = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: -30, rotateY: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
        duration: 0.5,
      },
    },
  };

  const getIcon = (char) => {
    switch (char) {
      case '😊':
        return <FaSmile style={iconStyle} />;
      case '📖':
        return <FaBook style={iconStyle} />;
      case '🥇':
        return <FaTrophy style={iconStyle} />;
      case '📱':
        return <FaMobileAlt style={iconStyle} />;
      default:
        return char;
    }
  };

  const mainText = 'Igniting😊the😊Power😊of';
  const learningText = 'Learning😊';

  return (
    <div className="animated-text-wrapper">

      <Card className="animated-background">
        <Card.Body>
          <motion.div
            className="animated-text-container"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {Array.from(mainText).map((letter, index) => (
              <motion.div
                key={index}
                className="animated-box"
                style={{ '--animation-delay': `${index * 0.3}s` }}
                variants={child}
                whileTap={{ scale: 0.9 }}
              >
                <span className="animated-letter">
                  {getIcon(letter)}
                </span>
              </motion.div>
            ))}
            <div className="animated-line-break">
              {Array.from(learningText).map((letter, index) => (
                <motion.div
                  key={index + mainText.length}
                  className="animated-box"
                  style={{ '--animation-delay': `${(index + mainText.length) * 0.3}s` }}
                  variants={child}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="animated-letter">
                    {getIcon(letter)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AnimatedText;
