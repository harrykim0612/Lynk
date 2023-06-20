import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstanceUsermanagement } from "../../api";
import axios from "axios";

// Define base datatype
interface stateProps {
    userInfo: {
        id: number,
        userCompanyName: string,
        userEmail: string,
        userAccountType: number,
        userCreatedAt: string,
    }
    registrationPending: boolean,
    loginPending: boolean,
    wholesalerhomePending: boolean,
}

const initialState: stateProps = {
    userInfo: {
        id: 0,
        userCompanyName: "",
        userEmail: "",
        userAccountType: 3,
        userCreatedAt: "",
    },
    registrationPending: false,
    loginPending: false,
    wholesalerhomePending: false
}

export const userLogin = createAsyncThunk(
    'user/login',
    async(userInfo: {email: string, password: string}, thunkAPI) => {
        try {
            const response = await axiosInstanceUsermanagement.post("/api/login", userInfo)
            return response.data
        }
        catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async(info: {company_name: string, email: string, password: string, account_type: number}, thunkAPI) => {
        try {
            const response = await axiosInstanceUsermanagement.post("/api/register", info);
            return response.data
        }
        catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const userWholeSalerHome = createAsyncThunk(
    'user/wholesaler',
    async(info: {company_name: string, account_type: number}, thunkAPI) => {
        try {
            const response = await axiosInstanceUsermanagement.post("/api/wholesalerhome", info);
            return response.data
        }
        catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userLogout(state) {
            state = initialState;
        },
        userPersist(state, action) {
            state.userInfo.id = action.payload.id;
            state.userInfo.userEmail = action.payload.userEmail;
            state.userInfo.userCompanyName = action.payload.userCompanyName;
            state.userInfo.userAccountType = action.payload.userAccountType;
            state.userInfo.userCreatedAt = action.payload.createdDate;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loginPending = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loginPending = false;
            state.userInfo.id = action.payload.id;
            state.userInfo.userEmail = action.payload.userEmail;
            state.userInfo.userCreatedAt = action.payload.createdDate;
        });
        builder.addCase(userLogin.rejected, (state) => {
            state.loginPending = false;
        });
        builder.addCase(userRegister.pending, (state) => {
            state.registrationPending = true;
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.registrationPending = false;
        });
        builder.addCase(userRegister.rejected, (state) => {
            state.registrationPending = false;
        });
        builder.addCase(userWholeSalerHome.pending, (state) => {
            state.wholesalerhomePending = true;
        });
        builder.addCase(userWholeSalerHome.fulfilled, (state, action) =>{
            state.wholesalerhomePending = false;
            state.userInfo.userCompanyName = action.payload.userCompanyNam;
            state.userInfo.userAccountType = action.payload.userAccountType;
        });
        builder.addCase(userWholeSalerHome.rejected, (state) => {
            state.wholesalerhomePending = false;
        });
    }
})

export const { userLogout, userPersist } = userSlice.actions
export default userSlice.reducer;
