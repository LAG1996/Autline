import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

//route components
import SplashContainer from '../imports/views/Splash.js';
import StorySelectContainer from '../imports/views/Story-Select.js';
import StoryEditorContainer from '../imports/views/Story-Editor.js';

export const browserHistory = createBrowserHistory();

export const renderRoutes = () => (

	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={SplashContainer}/>
			<Route path="/stories" component = {StorySelectContainer}/>
			<Route path="/editor" component = {StoryEditorContainer}/>
		</Switch>
	</Router>

);