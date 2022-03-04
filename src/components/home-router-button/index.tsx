import HomeRounded from '@material-ui/icons/HomeRounded';
import IconButton from '@material-ui/core/IconButton';

import { useHistory } from 'react-router';

export function HomeRouterButton() {
	const history = useHistory();

	return (
		<IconButton style={{ margin: '10px 0' }} onClick={() => history.push('/')}>
			<HomeRounded />
		</IconButton>
	);
}
