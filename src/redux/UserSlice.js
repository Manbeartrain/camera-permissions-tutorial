import { createSlice } from "@reduxjs/toolkit";
import {
	CAMERA_LIBRARY_PERMISSION_NOT_SET,
	CAMERA_PERMISSION_NOT_SET
} from "../utils/constants";

export const UserSlice = createSlice({
	name: "UserSlice",
	initialState: {
		user: {},
		cameraPermission: CAMERA_PERMISSION_NOT_SET,
		cameraLibraryPermission: CAMERA_LIBRARY_PERMISSION_NOT_SET
	},
	reducers: {
		//TODO: add reducers
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setBothCameraPermissions: (state, action) => {
			state.cameraPermission = action.payload.cameraPermission;
			state.cameraLibraryPermission = action.payload.cameraLibraryPermission;
		}
	}
});

export const { setUser, setBothCameraPermissions } = UserSlice.actions;
export default UserSlice.reducer;
