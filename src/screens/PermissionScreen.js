import React from "react";
import { View, Text, Alert } from "react-native";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
import {
	Button,
	ItemSeparator
} from "@digital-art-dealers/react-native-component-lib";
import { PERMISSION_TYPES } from "../utils/constants";
import usePermissions from "../hooks/usePermissions";
import { openSettings } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";

const CameraAnimation = require("../assets/lottie/CameraAnimation.json");

const PermissionScreen = ({ route }) => {
	const { requestCameraPermission } = usePermissions();
	const navigation = useNavigation();
	const { type } = route.params;

	const onPress = async () => {
		switch (type) {
			case PERMISSION_TYPES.CAMERA_REQUEST:
				await requestCameraPermission();
				navigation.pop();
				break;
			case PERMISSION_TYPES.CAMERA_ERROR:
				openSettings().catch((err) => Alert.alert(err.message));
				break;
		}
	};

	return (
		<View className="h-full w-full bg-white justify-center px-8">
			<LottieView
				source={CameraAnimation}
				className="w-[80%] self-center"
				autoPlay
				loop={true}
			/>
			<Text className="text-3xl font-extrabold uppercase tracking-widest self-center">
				Camera Access
			</Text>
			<Text className="text-base font-light text-center self-center">
				Applicaction requires access to camera and your library to set Profile
				avatar
			</Text>
			<ItemSeparator separatorStyle="h-4" />
			<Button
				onPress={onPress}
				label="continue"
				buttonColor="bg-blue-600"
				textColor="text-white"
			/>
		</View>
	);
};

PermissionScreen.propTypes = {
	route: PropTypes.object.isRequired
};

export default PermissionScreen;
