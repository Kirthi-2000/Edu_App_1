import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import './MyVerticallyCenteredModal.css'; // Import the CSS file for additional styling

const MyVerticallyCenteredModal = ({ show, onHide, title, icon, background }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const titles = ['JavaScript', 'Python', 'Java', 'HTML5', 'CSS3', 'React']; // List of all card titles
  const sidebarRef = useRef(null); // Reference to the sidebar element

  useEffect(() => {
    if (show) {
      // Delay showing the title and content
      const titleTimeout = setTimeout(() => setShowTitle(true), 500);
      const contentTimeout = setTimeout(() => setShowContent(true), 1000);

      // Clean up timeouts
      return () => {
        clearTimeout(titleTimeout);
        clearTimeout(contentTimeout);
      };
    } else {
      setShowTitle(false);
      setShowContent(false);
    }
  }, [show]);

  useEffect(() => {
    // Scroll to the active sidebar item if modal is already open
    if (show && sidebarRef.current) {
      const activeItem = sidebarRef.current.querySelector('.sidebar-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [show, title]);

  const handleScroll = (direction) => {
    const sidebar = document.querySelector('.sidebar');
    if (direction === 'up') {
      sidebar.scrollTop -= 30;
    } else {
      sidebar.scrollTop += 30;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="modal-90w"
      className={show ? 'zoomIn' : 'zoomOut'}
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background, display: 'flex' }}>
        {/* Sidebar with vertical text */}
        <div className="sidebar-container">
          <button className="scroll-arrow up-arrow" onClick={() => handleScroll('up')}>
            <i className="fas fa-solid fa-chevron-up"></i>
          </button>
          <div className="sidebar" ref={sidebarRef}>
            {titles.map((item, index) => (
              <div key={index} className={`sidebar-item ${item === title ? 'active' : ''}`}>
                {item}
              </div>
            ))}
          </div>
          <button className="scroll-arrow down-arrow" onClick={() => handleScroll('down')}>
            <i className="fas fa-solid fa-chevron-down"></i>
          </button>
        </div>

        {/* Main content on the right side */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', flexDirection: 'column' }}>
          <div className="popup-content" style={{ animation: 'fadeInRight 1s ease-out', flexDirection: 'row' }}>
            <div style={{ textAlign: 'center', position: 'relative', top: '-149px' }}>
              <img src={icon} alt={title} style={{ width: '300px', height: '350px', animation: 'fadeInLeft 1s ease-out' }} />
            </div>
            <div style={{ flexDirection: 'row' }}>
              {showTitle && <h2>{title}</h2>}
              {showContent && (
                <p style={{ animation: 'fadeInRight 1s ease-out', animationDelay: '0.7s', flexDirection: 'column' }}>
                  Your modal content here... Add more lines as needed.
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
