export function requireRule(msg) {
  return {
    required: true,
    message: msg || '不能为空'
  }
}
