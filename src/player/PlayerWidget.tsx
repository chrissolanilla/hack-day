import { Qset } from '../types/qset'

interface PlayerWidgetProps {
  qset: Qset,
  onEnd: () => void,
  submitQuestionForScoring: (id: string, answers: string, value: string) => void,
}

export default function PlayerWidget({ qset, onEnd, submitQuestionForScoring }: PlayerWidgetProps) {
  return (
    <h1>Hello!</h1>
  )
}
