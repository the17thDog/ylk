import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestGetUserInfo } from '@/apis/users';
import { setUser } from '@/store/user';

export function useUserInfo(hideInfo) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!hideInfo) {
      setUserInfo()
    }
  }, [hideInfo])

  const setUserInfo = useCallback(async () => {
    try {
      const res = await requestGetUserInfo()

      dispatch(setUser(res.data))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return {
    setUserInfo
  }
}
