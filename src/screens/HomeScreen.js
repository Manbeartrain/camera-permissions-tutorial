import React, { useLayoutEffect } from "react";
import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserProfile from "../components/home/UserProfile";
import UserDetails from "../components/home/UserDetails";
import { MODAL_SCREENS, NAVIGATORS } from "../utils/screens";

const HomeScreen = () => {
	const navigation = useNavigation();
	const handleEditProfile = () => {
		navigation.navigate(NAVIGATORS.MODAL, {
			screen: MODAL_SCREENS.EDIT_USER_PROFILE
		});
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShadowVisible: false,
			headerRight: () => (
				<Pressable className="mr-4" onPress={handleEditProfile}>
					<Icon name="edit" size={32} color="white" />
				</Pressable>
			)
		});
	}, [navigation]);
	return (
		<View className="bg-white w-full h-full">
			<UserProfile />
			<UserDetails />
		</View>
	);
};

export default HomeScreen;
