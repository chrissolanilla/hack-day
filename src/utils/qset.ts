export interface Qset {
  items: QsetItem[],
}

export interface QsetItem {
  id: string | number,
  materiaType: string,
  type: string,
  questions: QsetQuestion[],
  answers: QsetAnswer[],
}

type QsetQuestion = {
  text: string[],
}

type QsetAnswer = {
  text: { input: string, output: string }[],
  value: number,
}
