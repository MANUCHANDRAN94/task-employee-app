import './home.css';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<>
			<div className='header'>
				<div className='headerTitles'>
					<span className='headerTitleLg'>Blog</span>
				</div>
				<img
					className='headerImg'
					src='https://www.smartdatacollective.com/wp-content/uploads/2019/12/shutterstock_369815435.jpg'
					alt=''
				/>
			</div>
			<button className='landing-button'>
				<Link className='link' to='/dashboard'>
					Start
				</Link>
			</button>
		</>
	);
}
