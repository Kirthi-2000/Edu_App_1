import React, { useState, useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import Card from "./Card";
import { faJs, faPython, faJava, faHtml5, faCss3Alt, faReact } from '@fortawesome/free-brands-svg-icons';
import "./Carousel.css";

export default function Carroussel(props) {
  const cardData = [
    { icon: faJs, title: 'JavaScript' },
    { icon: faPython, title: 'Python' },
    { icon: faJava, title: 'Java' },
    { icon: faHtml5, title: 'HTML5' },
    { icon: faCss3Alt, title: 'CSS3' },
    { icon: faReact, title: 'React' },
  ];

  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const table = cardData.map((element, index) => {
      return {
        key: index,
        content: (
          <Card 
            icon={element.icon} 
            title={element.title} 
            isCenter={goToSlide === index}
            index={index}
            onClick={() => setGoToSlide(index)} // Pass onClick handler
          />
        ),
        onClick: () => setGoToSlide(index)
      };
    });

    setCards(table);
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows, goToSlide, cardData]);

  const handlePrevClick = () => {
    setGoToSlide((prevSlide) => (prevSlide - 1 + cards.length) % cards.length);
  };

  const handleNextClick = () => {
    setGoToSlide((prevSlide) => (prevSlide + 1) % cards.length);
  };

  return (
    <div
      className="carousel-container"
      style={{ backgroundColor: 'white',borderRadius: '5px',  width: props.width, height: props.height, margin: props.margin }}
    >
      <button className="prev-button" onClick={handlePrevClick}>
        &lt;
      </button>
      <div className="carousel-wrapper">
        <Carousel
          slides={cards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={showArrows}
          animationConfig={config.gentle}
        />
      </div>
      <button className="next-button" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
}
