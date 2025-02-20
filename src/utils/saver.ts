import { EditorQuestion, QuestionContent } from './editorQuestion';
import { Qset, QsetItem } from './qset'

export function convertToQset(questions: EditorQuestion[]): Qset {
  // Convert each question into a QsetItem[]
  const qsetItems: QsetItem[] = questions.map((q => {
    const questions = q.content.map((c) => {
      let text = '@'
      if (c.type === 'para')
        text += 'para:'
      else if (c.type === 'code')
        text += 'code:'
      else
        return ''

      return text += c.val
    })

    const answers = q.inputs.map((input, index) => {
      return {
        input,
        output: q.outputs[index],
      }
    })

    return {
      id: 0,
      materiaType: 'question',
      type: 'pythond',
      questions: [{ text: questions }],
      answers: [{ text: answers, value: 100 }],
    }
  }))

  return {
    items: qsetItems,
  }
}

export function convertToInternal(qset: Qset): EditorQuestion[] {
  // Generate initial set of questions from qset
  if (!qset?.items) return [{ // Create an initial set if the qset is empty
    content: [{ type: 'para', val: '' }],
    inputs: [''],
    outputs: [''],
  }]

  return qset.items.map((item) => {
    // Convert each qset item to EditorQuestion item
    const question = item.questions[0]
    const answers = item.answers[0]

    // Convert question contents
    const questionContents = question.text.map<QuestionContent>((rawQuestion) => {
      const trimmedText = rawQuestion.substring(6)
      if (rawQuestion.startsWith('@para:'))
        return { type: 'para', val: trimmedText }
      else if (rawQuestion.startsWith('@code:'))
        return { type: 'code', val: trimmedText }
      else return null
    }).filter((q) => !!q) // Filter out null

    // Convert inputs and outputs
    const questionInputs = answers.text.map((a) => a.input)
    const questionOutputs = answers.text.map((a) => a.output)

    // Construct final object
    return {
      content: questionContents,
      inputs: questionInputs,
      outputs: questionOutputs,
    }
  })
}
