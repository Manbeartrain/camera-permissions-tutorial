import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const UserDetails = () => {
	const user = useSelector(({ UserSlice }) => UserSlice.user);

	const email = useMemo(() => {
		return user?.email ? user.email : "No Email Set";
	}, [user]);

	const mobile = useMemo(() => {
		return user?.mobile ? user.mobile : "No Phone Number Set";
	}, [user]);

	const twitter = useMemo(() => {
		return user?.twitter ? user.twitter : "No Twitter Set";
	}, [user]);

	return (
		<ScrollView className="flex-1 bg-white  px-6">
			<View className="py-8  border-b border-gray-300 w-full">
				<Text className="text-sm text-gray-400 tracking-widest">Email</Text>
				<Text className="text-base tracking-wider">{email}</Text>
			</View>
			<View className="py-8  border-b border-gray-300 w-full">
				<Text className="text-sm text-gray-400 tracking-widest">Mobile</Text>
				<Text className="text-base tracking-wider">{mobile}</Text>
			</View>
			<View className="py-8 border-gray-300 w-full">
				<Text className="text-sm text-gray-400 tracking-widest">Twitter</Text>
				<Text className="text-base tracking-wider">@{twitter}</Text>
			</View>
		</ScrollView>
	);
};

export default UserDetails;
