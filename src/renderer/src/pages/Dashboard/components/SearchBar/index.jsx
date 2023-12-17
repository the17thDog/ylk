import { Input } from "antd"
import { forwardRef, useImperativeHandle } from "react"

const SearchBar = (props, ref) => {
  const { onSearch, loading = false } = props

  useImperativeHandle(ref, () => ({
    search(text) {
      onSearch(text)
    }
  }))

  return (
    <Input.Search
      placeholder="input search text"
      enterButton
      size="large"
      loading={loading}
      style={{ width: 304 }}
      onSearch={onSearch}
    />
  )
}

export default forwardRef(SearchBar)
