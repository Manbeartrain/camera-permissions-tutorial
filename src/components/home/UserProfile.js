import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { ItemSeparator } from "@digital-art-dealers/react-native-component-lib";
import { useSelector } from "react-redux";

const UserTemp = require("../../assets/avatar-temp.png");

const UserProfile = () => {
	const user = useSelector(({ UserSlice }) => UserSlice.user);

	const username = useMemo(() => {
		return user?.username ? user.username : "no username set";
	}, [user]);

	const title = useMemo(() => {
		return user?.title ? user?.title : "no title set";
	}, [user]);

	return (
		<View className="bg-blue-600 rounded-b-3xl py-4">
			<View className="h-32 w-32 self-center">
				<Image
					className="w-full h-full rounded-full"
					source={user?.image ? { uri: user.image } : UserTemp}
				/>
			</View>
			<ItemSeparator separatorStyle="h-4" />
			<Text className="text-2xl text-center text-white font-bold tracking-widest">
				{username}
			</Text>
			<Text className="text-lg text-center text-white font-light tracking-widest">
				{title}
			</Text>
			<ItemSeparator separatorStyle="h-8" />
			<View className="w-auto h-12 flex-row justify-between items-center self-center">
				<Text className="font-bold text-white">
					0 <Text className="font-light text-white">Followers</Text>
				</Text>
				<ItemSeparator separatorStyle="w-[.5px] h-full bg-white mx-8" />
				<Text className="font-bold text-white">
					0 <Text className="font-light text-white">Following</Text>
				</Text>
			</View>
		</View>
	);
};

export default UserProfile;
