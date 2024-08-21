import {configureStore,createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({

    name: "auth",
    initialState: {
      user: {},
      success: false,
    },

    reducers: {
      setUser: (state, action) => {
  
        state.user = action.payload;
        state.success = true;
      },
      logout(state, action) {
        state.success = false;
        state.user = {};
      },
    },

});


const adminAuthSlice=createSlice({
  name:"adminAuth",
  initialState:{
     admin:{},
     success:false
  },

  reducers:{
    setAdmin:(state,action)=>{

      state.admin=action.payload;
      state.success=true

    },
    adminLogout:(state,action)=>{
      state.admin={};
      state.success=false
    }
  }

})

const store= configureStore({
    reducer:{
        auth: authSlice.reducer,
        adminAuth:adminAuthSlice.reducer,
    }
})

export const{setUser,logout}=authSlice.actions
export const{setAdmin,adminLogout}=adminAuthSlice.actions
export default store