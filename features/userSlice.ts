import {createSlice, PayloadAction}  from "@reduxjs/toolkit"
import { User } from "../app/types/User"

const current:User = JSON.parse(localStorage.getItem('currentUser')|| '{}')

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
      localStorage.setItem('currentUser', JSON.stringify(state.value))
    },
  }
})

export const { currentUser} = currentUserSlice.actions
export default currentUserSlice.reducer

