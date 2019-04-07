
//const open_camraBtn = document.getElementById('open_camera')
function Capture_image()
{
    var {PythonShell} = require("python-shell");
    var path  = require('path');
    var options = {
            scriptPath: path.join(__dirname, '/../electron-taidum/python_script/'),
        };
    PythonShell.run('label_image.py',options,function(err, results){
        console.log('Program is start!!');
        if(err)throw err;
        
    })
}

