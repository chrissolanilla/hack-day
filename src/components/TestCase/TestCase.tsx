import styles from './styles.module.css'
import LabelledInput from '../LabelledInput/LabelledInput'
import Button from '../Button/Button'

interface TestCaseProps {
  index: number,
  input: string,
  output: string,
  updateInput: (newVal: string) => void,
  updateOutput: (newVal: string) => void,
  onDelete: () => void,
}

export default function TestCase({ index, input, output, updateInput, updateOutput, onDelete }: TestCaseProps) {
  return (
    <div className={styles.testCase}>
      <div className={styles.header}>
        <h3>{`Test Case ${index + 1}`}</h3>
        <Button
          size="sm"
          preIcon="/assets/trash.svg"
          color="transparent"
          onClick={onDelete}
        />
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.inputs}>
          <LabelledInput label="Input" value={input} onUpdate={updateInput} />
          <LabelledInput label="Expected Output" value={output} onUpdate={updateOutput} />
        </div>
      </div>
    </div>

  )
}
