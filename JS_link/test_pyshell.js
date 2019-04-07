function Write_file()
{
    const {PythonShell} = require('python-shell')
    const path = require('path')

    const options = {
        scriptPath:path.join(__dirname, '../electron-taidum/python_script')
    }

    PythonShell.run('write_file.py',options,function(err,results){
        console.log('Createfile Success!!')
        if(err)throw err;
    })
       
}