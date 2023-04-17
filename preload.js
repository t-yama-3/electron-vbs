const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})

window.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('saveman')
  console.log('kokomade!')
  element.addEventListener('click', () => {
    console.log('aaa')
    ipcRenderer.send('mailer');
  })
})
