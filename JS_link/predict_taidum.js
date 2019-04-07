


function Predict_taidum()
{
    
    alert('กำลังทำงาน กรุณารอสักครู่....')
    //change image src = predict.png
    
    //show tag loader
   
    var tag_loader = document.getElementById("loader");
    if(tag_loader.style.display == "block"){
        tag_loader.style.display = "none";
    }else{
        document.getElementById("word_procress").innerHTML = 'กำลังประมวลผล';
        tag_loader.style.display = "block";
    }

    /* Run Python Procress*/
    console.log('predicImage start...')
    const {PythonShell} = require('python-shell')
    const path = require('path')
    //var image_path = document.getElementById('path-value').value;
    // document.getElementById('path-value').value = "";
    var image_path = 'D:/Electron/taidum_classification_app/python_script/cupture_image/predict.jpeg'
    const options = {
        scriptPath:path.join(__dirname, '../taidum_classification_app/python_script'),
        args:[image_path]

    };
    console.log("directory name :",__dirname)
    try 
    {
        PythonShell.run('label_image2.py',options,function(err, results){
            console.log(results)
            console.log('All result', results)
            console.log('results[1] =>',results[1])
            document.getElementById('result_predict').innerHTML = 'ได้ผลลัพธ์ '+results[1]
            document.getElementById("word_procress").innerHTML  = 'ได้ผลลัพธ์ แล้ว';
            tag_loader.style.display = 'none';
            console.log('image 1 '+results[1]+'.jpeg')
            console.log('image 2 '+results[3]+'.jpeg')
            console.log('image 3 '+results[5]+'.jpeg')
        
            var image_top_predict_1 = results[1]+'.jpg'
            var image_top_predict_2 = results[3]+'.jpg'
            var image_top_predict_3 = results[5]+'.jpg'
            var score1 = results[2];
            var score2 = results[4];
            var score3 = results[6];
    
            var path_top_predict_1 ="D:/Electron/taidum_classification_app/original_image/"+image_top_predict_1;
            var path_top_predict_2 = "D:/Electron/taidum_classification_app/original_image/"+image_top_predict_2;
            var path_top_predict_3 = "D:/Electron/taidum_classification_app/original_image/"+image_top_predict_3;
            document.getElementById("top_predict_1").src= path_top_predict_1;
            document.getElementById("top_predict_2").src= path_top_predict_2;
            document.getElementById("top_predict_3").src= path_top_predict_3;
            document.getElementById("score1").innerHTML = score1;
            document.getElementById("score2").innerHTML = score2;
            document.getElementById("score3").innerHTML = score3;
            
            if(err)throw err; 
        }) 
    }
    
    catch(err)
    {
        console.log("Error จร้า");
        alert(err.message);
    }
   
}