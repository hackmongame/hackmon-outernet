import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests
} from '@codesandbox/sandpack-react'
import { gruvboxDark } from '@codesandbox/sandpack-themes'
import showdown from '@/lib/showdown'
import styles from './Editor.module.scss'
import {useEffect, useState} from 'react'
const customTheme = {
  ...gruvboxDark,
  font: {
    ...gruvboxDark.font,
    body: 'Monaco, var(--monospace)',
    mono: 'Monaco, var(--monospace)',
    size: '18px',
    lineHeight: '26px',
    fontWeight: '600'
  }
}

export default function Editor({
  title: initialTitle,
  description: initialDescription,
  code: initialCode,
  tests: initialTests,
  functionName: initialFunctionName,
  nextTest,
  attack,
  miss,
  setAttacking,
  encounter
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription)
  const [code, setCode] = useState(initialCode)
  const [tests, setTests] = useState(initialTests)
  const [functionName, setFunctionName] = useState(initialFunctionName)

  return (
    <div className={styles.container}>
      <div
        className={`prose in-modal ${styles.wrapper} ${styles.max30}`}
        style={{ padding: '0.5rem 1.5rem' }}>
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: showdown.makeHtml(description)
          }}
        />
        <ul className={styles.tests}>
          {Object.keys(tests).map((test, idx) => (
            <li
              dangerouslySetInnerHTML={{ __html: showdown.makeHtml(test) }}
              key={idx}
            />
          ))}
        </ul>
      </div>
      <div>
      <img style={{minHeight: "400px", position: "absolute", top: 32, right: "25%" }} src={"/characters/" + encounter.split(" ").join("-") + ".png"}/>
            <img style={{minHeight: "400px", position: "absolute", bottom: 32, left: "25%"}} src={"/luna/luna_back_walking_still.png"}/>

      </div>
      <SandpackProvider
        template="vanilla"
        theme={customTheme}
        files={{
          '/sandbox.config.json': `{
  "infiniteLoopProtection": false
}`,
          '/index.js': initialCode,
          '/index.test.js': `import {${functionName}} from "./index.js";

${Object.values(tests).join('\n')}
`
        }}
        options={{ visibleFiles: ['/index.js'] }}>
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackTests
            onComplete={_ => {

              console.log(_)
              if (!_['/index.test.js'].error) {
                // No error = pass

                nextTest()
                attack(50)
                setAttacking(false)

              }
            }}
          />
          <button>Complete</button>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
