import { Image, Pressable, View } from "react-native";
import React, { useRef, useState } from "react";
import {
	Button,
	ItemSeparator,
	TextInput
} from "@digital-art-dealers/react-native-component-lib";

import usePermissions from "../hooks/usePermissions";
import ImageOptions from "../components/home/ImageOptions";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/UserSlice";
import { useNavigation } from "@react-navigation/native";

const UserTemp = require("../assets/avatar-temp.png");

const EditProfileScreen = () => {
	const { checkCameraPermission } = usePermissions();
	const navigation = useNavigation();

	const dispatch = useDispatch();
	const bottomSheetRef = useRef(null);

	const user = useSelector(({ UserSlice }) => UserSlice.user);

	const [image, setImage] = useState(user?.image ? user?.image : "");
	const [username, setUsername] = useState(
		user?.username ? user?.username : ""
	);
	const [title, setTitle] = useState(user?.title ? user?.title : "");
	const [email, setEmail] = useState(user?.email ? user?.email : "");
	const [mobile, setMobile] = useState(user?.mobile ? user?.mobile : "");
	const [twitter, setTwitter] = useState(user?.twitter ? user?.twitter : "");

	const handleUploadImageOnPress = async () => {
		await checkCameraPermission({
			displayPermissionRequestModals: true,
			callback: () => {
				bottomSheetRef.current.snapTo(1);
			}
		});
	};

	const upload = (image) => {
		setImage(image);
	};

	const saveProfileOnPress = () => {
		dispatch(setUser({ image, username, title, email, mobile, twitter }));
		navigation.pop();
	};

	return (
		<View className="w-full h-full bg-white">
			<View className="px-8 py-8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         flex-1">
				<Pressable
					className="h-32 w-32 rounded-full self-center mb-8"
					onPress={handleUploadImageOnPress}
				>
					<Image
						source={image ? { uri: image } : UserTemp}
						className="h-full w-full rounded-full"
					/>
				</Pressable>
				<TextInput type="text" label="Username" onChangeText={setUsername} />
				<TextInput type="text" label="Title" onChangeText={setTitle} />
				<TextInput type="text" label="Email" onChangeText={setEmail} />
				<TextInput type="text" label="Mobile" onChangeText={setMobile} />
				<TextInput type="text" label="Twitter" onChangeText={setTwitter} />
				<ItemSeparator separatorStyle="h-2" />
				<Button
					onPress={saveProfileOnPress}
					label="Save Profile"
					buttonColor="bg-blue-600"
					textColor="text-white"
				/>
			</View>
			<ImageOptions bottomSheetRef={bottomSheetRef} upload={upload} />
		</View>
	);
};

export default EditProfileScreen;
