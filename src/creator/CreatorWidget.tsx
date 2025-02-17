import { Qset } from '../types/qset'

interface CreatorWidgetProps {
  title: string | null,
  qset: Qset,
  updateTitle: (newTitle: string) => void,
  registerSaver: (validator: () => Qset | string) => void,
}

export default function CreatorWidget({ title, qset, updatedTitle, registerSaver }: CreatorWidgetProps) {
  return (
    <h1>Hello creator!!!</h1>
  )
}
