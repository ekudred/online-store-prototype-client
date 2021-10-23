import { useCallback } from "react"

export default function useValidation() {
  const onChangeLoginHandler = useCallback((e, setState, setValidState) => {
    setState(e.target.value)

    // В логине должны быть только латинские буквы
    if (/^[a-zA-Z1-9]+$/.test(e.target.value) === false) {
      setValidState(false)

      return
    }

    // В логине должен быть от 4 до 20 символов
    if (e.target.value.length < 4 || e.target.value.length > 14) {
      setValidState(false)

      return
    }

    // Логин должен начинаться с буквы
    if (parseInt(e.target.value.substr(0, 1))) {
      setValidState(false)

      return
    }

    setValidState(true)
  }, [])

  const onChangeEmailHandler = useCallback((e, setState, setValidState) => {
    setState(e.target.value)

    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    if (re.test(String(e.target.value).toLowerCase())) {
      setValidState(true)

      return
    }

    setValidState(false)
  }, [])

  const onChangePasswordHandler = useCallback((e, setState, setValidState) => {
    setState(e.target.value)

    if (e.target.value.length >= 8 && e.target.value.length <= 32) {
      setValidState(true)

      return
    }

    setValidState(false)
  }, [])

  return { onChangeLoginHandler, onChangeEmailHandler, onChangePasswordHandler }
}
