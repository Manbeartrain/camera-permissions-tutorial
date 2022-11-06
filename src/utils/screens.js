import React from "react";
import EditProfileScreen from "../screens/EditProfileScreen";
import PermissionScreen from "../screens/PermissionScreen";

export const NAVIGATORS = {
	BOTTOM_TAB: "Bottom Tab",
	LANDING: "Landing Stack",
	MODAL: "Modal Stack"
};

export const BOTTOM_TAB_SCREENS = {
	HOME_SCREEN: "Home"
};

export const MODAL_SCREENS = {
	PERMISSIONS: "Permissions",
	EDIT_USER_PROFILE: "Edit Profile"
};

export const MODAL_SCREENS_ARRAY = [
	{
		name: MODAL_SCREENS.PERMISSIONS,
		component: (props) => <PermissionScreen {...props} />,
		options: {
			headerTitle: "",
			headerBackTitle: "Back"
		}
	},
	{
		name: MODAL_SCREENS.EDIT_USER_PROFILE,
		component: (props) => <EditProfileScreen {...props} />,
		options: {
			headerTitle: MODAL_SCREENS.EDIT_USER_PROFILE,
			headerBackTitle: "Back"
		}
	}
];
