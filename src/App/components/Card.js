import React, { useState } from "react";
import "./styles.css";
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'; // Import your modal component

import icon1 from '../images/icon2.png';
import icon2 from '../images/icon1.png';
import icon3 from '../images/icon3.png';
import icon4 from '../images/icon4.png';
import icon5 from '../images/icon5.png';
import icon6 from '../images/icon3.png';

const Card = ({ title, icon, isCenter, index }) => {
  const CARDSIZE = 190;
  const CARDWIDTH = CARDSIZE * 2;
  const CARDBORDERRADIUS = CARDSIZE * 0.1;
  const CARDTITLEPOS = CARDWIDTH * 0.21;

  const rainbowGradients = [
    'linear-gradient(354deg, red, #ff6868)',
    'linear-gradient(135deg, orange, yellow)',
    'linear-gradient(175deg, yellow, green)',
    'linear-gradient(165deg, green, blue)',
    'linear-gradient(178.7deg,  rgba(126,184,253,1) 5.6%, rgba(2,71,157,1) 95.3% )',
    'linear-gradient(135deg, indigo, violet)',
  ];

  const [modalShow, setModalShow] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('');

  const chosenGradient = rainbowGradients[index % rainbowGradients.length];
  const iconMapping = {
    'JavaScript': icon1,
    'Python': icon2,
    'Java': icon3,
    'HTML5': icon4,
    'CSS3': icon5,
    'React': icon6,
  };
  const languageIcon = iconMapping[title];

  const handleClick = () => {
    setSelectedTitle(title);
    setSelectedIcon(languageIcon);
    setSelectedBackground(chosenGradient);
    setModalShow(true);
  };

  return (
    <div
      className={`cardContainer ${isCenter ? 'centerCard' : ''}`}
      style={{
        height: CARDSIZE,
        width: CARDWIDTH,
        borderRadius: CARDBORDERRADIUS,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'transform 0.5s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={handleClick}
        className="outerCard"
        style={{
          background: 'rgb(240 240 240 / 0%)',
          padding: '10px',
          borderRadius: '10px',
          width: '80%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="innerCard"
          style={{
            background: chosenGradient,
            padding: '20px',
            borderRadius: '20px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s, background 0.5s',
            transform: isCenter ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <div
            className={`cardIconContainer ${isCenter ? 'zoomEffect' : ''}`}
            style={{
              height: '180px',
              marginBottom: '10px',
              transition: 'transform 0.5s',
              position: 'absolute',
              top: '-120px',
              zIndex: 1,
            }}
          >
            <img src={languageIcon} alt={title} style={{ height: '700px' }} />
          </div>

          <div
            className="titleContainer"
            style={{
              position: 'absolute', // Positioning the title
              bottom: '10px', // Aligning at the bottom
              left: '10px', // Aligning at the left
              textAlign: 'left',
              color: '#fff',
              zIndex: 1,
            }}
          >
            <div id="title" style={{ right: CARDTITLEPOS }}>
              {title}
            </div>
          </div>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={selectedTitle}
        icon={selectedIcon}
        background={selectedBackground}
      />
    </div>
  );
};

export default Card;
