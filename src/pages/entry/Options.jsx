import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);

	// optionType is 'scoops' or 'toppings'
	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((error) => {});
	}, [optionType]);

	// TODO: replace null with TopingOption
	const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));

	return <Row>{optionItems}</Row>;
}
