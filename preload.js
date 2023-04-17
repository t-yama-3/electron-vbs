const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})

window.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('saveman')
  element.addEventListener('click', () => {
    const mail = document.getElementById('mail').value
    ipcRenderer.send('mailer', mail);
  })
})
