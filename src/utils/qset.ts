export interface Qset {
  items: QsetItem[],
  options: unknown,
}

export interface QsetItem {
  id: string,
  materiaType: string,
  type: string,
  questions: QsetQuestion[],
  answers: QsetAnswer[],
  options: unknown,
}

type QsetQuestion = {
  text: string[],
}

type QsetAnswer = {
  text: { input: string, output: string }[],
  value: number,
}
