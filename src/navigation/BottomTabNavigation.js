import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

import { BOTTOM_TAB_SCREENS } from "../utils/screens";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => (
	<Tab.Navigator
		screenOptions={() => ({
			headerLeft: false,
			tabBarIcon: () => <Icon name="account-box" size={48} color="#2563eb" />,
			headerTitleStyle: {
				color: "white"
			},
			tabBarShowLabel: false,
			headerStyle: {
				backgroundColor: "#2563eb"
			},
			tabBarStyle: {
				paddingTop: 8
			}
		})}
	>
		<Tab.Screen name={BOTTOM_TAB_SCREENS.HOME_SCREEN} component={HomeScreen} />
	</Tab.Navigator>
);

BottomTabNavigation.propTypes = {
	navigation: PropTypes.object
};

export default BottomTabNavigation;
