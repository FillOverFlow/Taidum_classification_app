const {ipcRenderer} = require('electron')
const openfileBtn = document.getElementById('openfileBtn')

openfileBtn.addEventListener('click', (event) =>{
    ipcRenderer.send('open-file-dialog')
})
ipcRenderer.on('selected-directory',(event, path) =>{
    
    document.getElementById('selected-file').innerHTML = path
    document.getElementById('path-value').value = path
})