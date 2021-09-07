import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import FormComponent from './component/form/Form';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<div className='wrapping-container'>
					<Route exact path='/dashboard'>
						<Dashboard />
					</Route>
					<Route path='/employees/:id'>
						<FormComponent />
					</Route>
					<Route path='/create'>
						<FormComponent />
					</Route>
				</div>
			</Switch>
		</Router>
	);
}

export default App;
