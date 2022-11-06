import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { MODAL_SCREENS_ARRAY } from "../utils/screens";

const Stack = createStackNavigator();

const ModalNavigation = () => (
	<Stack.Navigator>
		{MODAL_SCREENS_ARRAY.map((screen) => (
			<Stack.Screen
				key={screen.name}
				name={screen.name}
				options={screen.options}
			>
				{screen.component}
			</Stack.Screen>
		))}
	</Stack.Navigator>
);

ModalNavigation.propTypes = {
	navigation: PropTypes.object
};

export default ModalNavigation;
