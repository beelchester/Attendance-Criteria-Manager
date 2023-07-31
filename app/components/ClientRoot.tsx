'use client'
import React, { useEffect } from 'react'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const ClientRoot = () => {
    const user = useSelector((state:RootState) => state.currentUser.value)
    const router = useRouter()
    useEffect(() => {
             if (!user || !user.hasOwnProperty("ID")) {
                    router.push("/login")
                }
            }, [])
  return (
    <div>Loading</div>
  )
}

export default ClientRoot
