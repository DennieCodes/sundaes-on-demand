import Options from './entry/Options';

const OrderEntry = () => {
	return (
		<div>
			<Options optionsType="scoops" />
			<Options optionsType="toppings" />
		</div>
	);
};

export default OrderEntry;
