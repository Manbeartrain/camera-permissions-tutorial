import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import {
	checkMultiple,
	PERMISSIONS,
	requestMultiple,
	RESULTS
} from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import { setBothCameraPermissions } from "../redux/UserSlice";
import {
	CAMERA_LIBRARY_PERMISSION_NOT_SET,
	CAMERA_PERMISSION_NOT_SET,
	PERMISSION_TYPES
} from "../utils/constants";
import { MODAL_SCREENS, NAVIGATORS } from "../utils/screens";

export default function usePermissions() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const cameraPermission = useSelector(
		({ UserSlice }) => UserSlice.cameraPermission
	);

	const cameraLibraryPermission = useSelector(
		({ UserSlice }) => UserSlice.cameraLibraryPermission
	);

	// Request camera permission
	const requestCameraPermission = async () => {
		await requestMultiple(
			Platform.OS === "ios"
				? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
				: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
		).then((statuses) => {
			dispatch(
				setBothCameraPermissions({
					cameraPermission:
						statuses[
							Platform.OS === "ios"
								? PERMISSIONS.IOS.CAMERA
								: PERMISSIONS.ANDROID.CAMERA
						],
					cameraLibraryPermission:
						statuses[
							Platform.OS === "ios"
								? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
								: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
						]
				})
			);
		});
	};

	// Checks camera permission
	const checkCameraPermission = async ({
		displayPermissionRequestModals = false,
		callback
	}) => {
		// step 1 make sure this isn't a fresh install
		if (
			cameraPermission === CAMERA_PERMISSION_NOT_SET &&
			cameraLibraryPermission === CAMERA_LIBRARY_PERMISSION_NOT_SET
		) {
			return (
				displayPermissionRequestModals &&
				navigation.navigate(NAVIGATORS.MODAL, {
					screen: MODAL_SCREENS.PERMISSIONS,
					params: {
						type: PERMISSION_TYPES.CAMERA_REQUEST
					}
				})
			);
		}

		// step 2 check if camera permission is granted
		await checkMultiple(
			Platform.OS === "ios"
				? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]
				: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
		).then((statuses) => {
			dispatch(
				setBothCameraPermissions({
					cameraPermission:
						statuses[
							Platform.OS === "ios"
								? PERMISSIONS.IOS.CAMERA
								: PERMISSIONS.ANDROID.CAMERA
						],
					cameraLibraryPermission:
						statuses[
							Platform.OS === "ios"
								? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
								: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
						]
				})
			);
		});

		if (displayPermissionRequestModals) {
			switch (cameraPermission) {
				case RESULTS.DENIED:
					return navigation.navigate(NAVIGATORS.MODAL, {
						screen: MODAL_SCREENS.PERMISSIONS_SCREEN,
						params: {
							type:
								Platform.OS === "android"
									? PERMISSION_TYPES.CAMERA_ERROR
									: PERMISSION_TYPES.CAMERA_REQUEST
						}
					});
				case RESULTS.BLOCKED:
					return navigation.navigate(NAVIGATORS.MODAL, {
						screen: MODAL_SCREENS.PERMISSIONS,
						params: {
							type: PERMISSION_TYPES.CAMERA_ERROR
						}
					});
			}
		}

		if (displayPermissionRequestModals) {
			switch (cameraLibraryPermission) {
				case RESULTS.DENIED:
					return navigation.navigate(NAVIGATORS.MODAL, {
						screen: MODAL_SCREENS.PERMISSIONS_SCREEN,
						params: {
							type:
								Platform.OS === "android"
									? PERMISSION_TYPES.CAMERA_ERROR
									: PERMISSION_TYPES.CAMERA_REQUEST
						}
					});
				case RESULTS.BLOCKED:
					return navigation.navigate(NAVIGATORS.MODAL, {
						screen: MODAL_SCREENS.PERMISSIONS,
						params: {
							type: PERMISSION_TYPES.CAMERA_ERROR
						}
					});
			}
		}

		callback && callback();
	};

	return { requestCameraPermission, checkCameraPermission };
}
