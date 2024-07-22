import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { ThemeProvider } from 'react-jss';
import { ReactNotifications } from 'react-notifications-component';
import { useFullscreen } from 'react-use';
import { TourProvider } from '@reactour/tour';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ThemeContext from '../contexts/themeContext';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import steps, { styles } from '../steps';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import { ToastCloseButton } from '../components/bootstrap/Toasts';
import './components/styles.css';
import Login from './components/Login';
import AnimatedText from './components/AnimatedText';
import Carousel from './components/Carousel';
import Card from './components/Card';
import { faJs, faPython, faJava, faHtml5, faCss3Alt, faReact } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavScrollExample from './components/NavScrollExample';

const App = () => {
	getOS();

	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime);

	/**
	 * Dark Mode
	 */
	const { themeStatus, darkModeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	useEffect(() => {
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
			document.documentElement.removeAttribute('data-bs-theme');
		};
	}, [darkModeStatus]);

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	}, []);

	const cards = [
		{ key: uuidv4(), content: <Card title="JavaScript" icon={faJs} isCenter={true} index={0} /> },
		{ key: uuidv4(), content: <Card title="Python" icon={faPython} isCenter={false} index={1} /> },
		{ key: uuidv4(), content: <Card title="Java" icon={faJava} isCenter={false} index={2} /> },
		{ key: uuidv4(), content: <Card title="HTML5" icon={faHtml5} isCenter={false} index={3} /> },
		{ key: uuidv4(), content: <Card title="CSS3" icon={faCss3Alt} isCenter={false} index={4} /> },
		{ key: uuidv4(), content: <Card title="React" icon={faReact} isCenter={false} index={5} /> },
	];

	const location = useLocation();
	const isAnimatedTextPage = location.pathname === '/animated-text';

	return (
		<ThemeProvider theme={theme}>
			<TourProvider steps={steps} styles={styles} showNavigation={false} showBadge={false}>
				<div
					ref={ref}
					className='app'
					style={{
						backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : undefined,
						zIndex: fullScreenStatus ? 1 : undefined,
						overflow: fullScreenStatus ? 'scroll' : undefined,
					}}>
					{/* Only render AsideRoutes if not on the AnimatedText page */}
					{!isAnimatedTextPage && <AsideRoutes />}
					<Wrapper />
				</div>

				<Portal id='portal-notification'>
					<ReactNotifications />
				</Portal>
				<ToastContainer closeButton={ToastCloseButton} toastClassName='toast show' />

				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/animated-text"
						element={
							<>
        						<NavScrollExample />
								<AnimatedText />
								<div className="App">
									<Carousel
										cards={cards}
										height="500px"
										width="80%"
										margin="0 auto"
										offset={2}
										showArrows={true}
									/>
								</div>
							</>
						}
					/>
					<Route path="*" element={<div>404 Not Found</div>} /> {/* Optional 404 page */}
				</Routes>
			</TourProvider>
		</ThemeProvider>
	);
};

export default App;
