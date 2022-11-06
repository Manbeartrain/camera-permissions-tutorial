import { Alert } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function usePhotos() {
	const openCamera = async () => {
		const options = {
			storageOptions: {
				path: "imagers",
				mediaType: "photo"
			}
		};

		try {
			const response = await launchCamera(options);
			if (response.didCancel) {
				return;
			} else {
				return response.assets[0]?.uri;
			}
		} catch (err) {
			Alert.alert(err.message);
		}
	};

	const openLibrary = async () => {
		const options = {
			storageOptions: {
				path: "images",
				mediaType: "photo"
			}
		};

		try {
			const response = await launchImageLibrary(options);
			if (response.didCancel) {
				return;
			} else {
				return response.assets[0]?.uri;
			}
		} catch (err) {
			Alert.alert(err.message);
		}
	};

	return { openCamera, openLibrary };
}
