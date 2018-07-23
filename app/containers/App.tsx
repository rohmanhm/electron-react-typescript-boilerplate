import * as React from 'react'
import { ipcRenderer } from 'electron'

export default class App extends React.Component {
  constructor (props: any) {
    super(props)    
    ipcRenderer.send('TEST', 'GONDES', {
      id: '34',
      name: 'baba'
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
