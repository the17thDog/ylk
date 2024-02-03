/**
 * @enum tab类型
 */
export const TAB_TYPE = {
  Word: 'Word',
  Phrase: 'Phrase',
  Article: 'Article',
}

/**
 * @enum 后端类型
 */
export const BACK_TYPE = {
  [TAB_TYPE.Word]: 1,
  [TAB_TYPE.Phrase]: 2,
  [TAB_TYPE.Article]: 3
}

/**
 * @enum tab描述
 */
export const TAB_LABEL = {
  [TAB_TYPE.Word]: '单词',
  [TAB_TYPE.Phrase]: '短语',
  [TAB_TYPE.Article]: '文章',
}
