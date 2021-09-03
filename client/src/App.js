import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Form from './component/form/Form';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/dashboard'>
					<Dashboard />
				</Route>
				<Route path='/employees/:id'>
					<Form />
				</Route>
				<Route path='/create'>
					<Form />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
