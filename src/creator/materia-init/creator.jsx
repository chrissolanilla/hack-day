import React from 'react'
import ReactDOM from 'react-dom'
import CreatorWidget from '../CreatorWidget';

// State
let currentTitle = null
let saver = null

// Callbacks
const materiaCallbacks = {}

materiaCallbacks.initNewWidget = (instance) => {
  materiaCallbacks.initExistingWidget(null, instance, undefined)
}

materiaCallbacks.initExistingWidget = (title, instance, _qset) => {
  const rootElement = document.getElementById('root')

  ReactDOM.createRoot(rootElement).render(
    <CreatorWidget
      title={title}
      qset={_qset}
      updateTitle={(newTitle) => currentTitle = newTitle}
      registerSaver={(s) => saver = s}
    />,
  )
}

materiaCallbacks.onSaveClicked = () => {
  const saverResult = saver()

  if (typeof saverResult === 'string') {
    Materia.CreatorCore.cancelSave(saverResult)
    return
  }

  Materia.CreatorCore.save(
    currentTitle,
    saverResult,
  )
}

materiaCallbacks.manualResize = false

Materia.CreatorCore.start(materiaCallbacks)
