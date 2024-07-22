import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import contents from '../../routes/contentRoutes';


const ContentRoutes = () => {
	return (
		<Routes>
			{contents.map((page) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Route key={page.path} {...page} />
			))}
			{/* Comment out or remove 404 route if not needed */}
			{/* <Route path='*' element={<PAGE_404 />} /> */}
		</Routes>
	);
};

export default ContentRoutes;
