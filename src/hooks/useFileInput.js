import { useEffect, useState } from 'react'

export default function useFileInput() {
  const [result, setResult] = useState(null)
  const [file, setFile] = useState(null)

  const onChangeFileInput = e => {
    const file = e.target.files[0]

    if (e.target.files[0] && file.type.split('/')[0] === 'image') {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setResult(reader.result)
        setFile({
          file,
          result: reader.result,
        })
      }
    }
  }

  useEffect(() => {
    return () => {
      setResult(null)
      setFile(null)
    }
  }, [])

  return { onChangeFileInput, result, file }
}
