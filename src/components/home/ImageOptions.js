import React from "react";
import { View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import PropTypes from "prop-types";
import {
	Button,
	ItemSeparator
} from "@digital-art-dealers/react-native-component-lib";
import usePhotos from "../../hooks/usePhotos";

const ImageOptions = ({ bottomSheetRef, upload }) => {
	const { openCamera, openLibrary } = usePhotos();
	const handleCloseImageOptions = () => {
		bottomSheetRef.current.snapTo(0);
	};

	const handleCameraOnPress = async () => {
		await openCamera();
	};

	const handleImageLibraryOnPress = async () => {
		const image = await openLibrary();
		upload(image.substring(7));
		handleCloseImageOptions();
	};

	const renderContent = () => (
		<View className="h-full w-full justify-start bg-gray-300 p-8">
			<Button
				onPress={handleCameraOnPress}
				label="Take a picture"
				type="primary"
				buttonColor="bg-white"
				textColor="text-black"
			/>
			<ItemSeparator separatorStyle="h-4" />
			<Button
				onPress={handleImageLibraryOnPress}
				label="Choose from gallery"
				type="primary"
				buttonColor="bg-white"
				textColor="text-black"
			/>
			<ItemSeparator separatorStyle="h-4" />
			<Button
				onPress={handleCloseImageOptions}
				label="Cancel"
				type="primary"
				buttonColor="bg-red-600"
				textColor="text-white"
			/>
		</View>
	);
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={[0, 260]}
			initialSnap={0}
			borderRadius={25}
			renderContent={renderContent}
			enabledGestureInteraction={false}
		/>
	);
};

ImageOptions.propTypes = {
	bottomSheetRef: PropTypes.object.isRequired,
	upload: PropTypes.func.isRequired
};

export default ImageOptions;
