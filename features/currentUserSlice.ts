import {createSlice, PayloadAction}  from "@reduxjs/toolkit"
import { User } from "../app/types/User"

const current:User = JSON.parse((typeof window != "undefined" && localStorage.getItem('currentUser'))|| '{}')

interface State{
  value: User
}

const initialState:State = {
  value:current
}

export const currentUserSlice = createSlice({
  name:"currentUser",
initialState,
  reducers:{
    currentUser:(state,action:PayloadAction<any>) => {
      state.value = action.payload
      if(typeof window !== 'undefined'){
          localStorage.setItem('currentUser', JSON.stringify(state.value))
      }
    },
    updateCurrentUser:(state,action:PayloadAction<any>) => {
        state.value = {
                ...state.value,
                Subjects: action.payload
        }
        if(typeof window !== 'undefined'){
            localStorage.setItem('currentUser', JSON.stringify(state.value))
        }
        },
  }
})

export const {currentUser,updateCurrentUser} = currentUserSlice.actions
export default currentUserSlice.reducer

