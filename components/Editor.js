import {
  SandpackProvider,
  SandpackLayout,
  SandpackConsole,
  SandpackCodeEditor,
  Sandpack,
  SandpackTests
} from '@codesandbox/sandpack-react'
import { gruvboxDark } from '@codesandbox/sandpack-themes'
import showdown from '@/lib/showdown'
import styles from './Editor.module.scss'

// Testing
import roadmap from '@/roadmap/project-euler'

const curr = roadmap.levels[0]

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

export default function Editor() {
  return (
    <>
      <div
        className={`prose in-modal ${styles.wrapper}`}
        style={{ padding: '0.5rem 1.5rem' }}>
        <h1>{curr.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: showdown.makeHtml(curr.description)
          }}
        />
        <ul className={styles.tests}>
          {Object.keys(curr.tests).map((test, idx) => (
            <li
              dangerouslySetInnerHTML={{ __html: showdown.makeHtml(test) }}
              key={idx}
            />
          ))}
        </ul>
      </div>
      <SandpackProvider
        template="vanilla"
        theme={customTheme}
        files={{
          '/index.js': curr.code
        }}>
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackConsole />
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}
