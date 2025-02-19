export type EditorQuestion = {
  content: QuestionContent[],
  inputs: string[],
  outputs: string[],
}

export type QuestionContent = {
  type: 'para' | 'code',
  val: string,
}
