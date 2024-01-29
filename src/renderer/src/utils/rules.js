export function requireRule(msg) {
  return {
    required: true,
    message: msg || '不能为空'
  }
}

/**
 * @returns {import("antd/es/form").Rule}
 */
export function passwordRule() {
  const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,12}')

  return {
    message: '密码中必须包含字母、数字、特殊字符， 6-12个字符',
    validator(_, value, aaa) {
      return pwdRegex.test(value) ? Promise.resolve() : Promise.reject()
    }
  }
}
