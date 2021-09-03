import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Edit from './pages/edit/Edit';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/employees'>
					<Dashboard />
				</Route>
				<Route path='/employees/:id'>
					<Edit />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
