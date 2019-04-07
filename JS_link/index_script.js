// script jcrop
jQuery(function($){
  
    var jcrop_api;

    $('#canvas_target').Jcrop({
      onChange:   showCoords,
      onSelect:   showCoords,
      onRelease:  clearCoords
    },function(){
      jcrop_api = this;
    });

    $('#coords').on('change','input',function(e){
      var x1 = $('#x1').val(),
          x2 = $('#x2').val(),
          y1 = $('#y1').val(),
          y2 = $('#y2').val();
      jcrop_api.setSelect([x1,y1,x2,y2]);
    });

  });



 
  function clearImage()
  {
    canvas_crop = document.getElementById("canvas_crop")
    context = canvas_crop.getContext('2d')
    console.log("clear image!!")
    context.clearRect(0, 0, 1200, 1000)
  }
  // Simple event handler, called from onChange and onSelect
  // event handlers, as per the Jcrop invocation above
  function showCoords(c)
  {
    $('#x1').val(c.x);
    $('#y1').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function clearCoords()
  {
    $('#coords input').val('');
  };
  function delete_old_image()
  {
    
      const fs = require('fs');
      const filePath = 'D:/Electron/taidum_classification_app/python_script/cupture_image/predict.jpeg';
      fs.access(filePath, error => {
          if (!error) {
              console.log('Delete File predict...');
              fs.unlink(filePath,function(error){
                  console.log(error);
              });
          } else {
              console.log(error);
          }
      });
  }
  function save_image_crop()
  {
      delete_old_image()
  
      var canvas = document.getElementById('canvas_crop');
      var dataURL = canvas.toDataURL('image/jpeg').replace("image/jpeg", "image/octet-stream");
      console.log("create new Image");
    

      var dl = document.createElement("a");
      dl.href = dataURL
      dl.innerHTML = "predict.jpeg";
      dl.download = "predict.jpeg"; // Make sure the browser downloads the image
      document.body.appendChild(dl); // Needs to be added to the DOM to work
      dl.click(); //
  
     
      
  }
  
  crop = function(){
    console.log('Crop fucntion Active!!!')
    var x1 = $('#x1').val(),
          x2 = $('#x2').val(),
          y1 = $('#y1').val(),
          y2 = $('#y2').val();
          width = $("#w").val();
          height = $("#h").val();
    
    var target = document.getElementById('canvas_target');
    
    var crop_canvas = document.getElementById('canvas_crop');
    var context_canvas_crop = canvas_crop.getContext('2d');
    
    var canvas_choose_predict = document.getElementById("image_for_predict");
    var context_choose_predict = canvas_choose_predict.getContext('2d');

    var left = x2-width
    var top  = y2-height

    context_canvas_crop.drawImage(target,left,top,width,height,0,0,width,height);
    document.getElementById('button_predict').style.visibility='visible'; //for show display button
    context_choose_predict.drawImage(target,left,top,width,height,0,0,width,height);


    /* save image crop */

    save_image_crop()

    // console.log('left',left)
    // console.log('top',top)
    // console.log('weight:',width);
    // console.log('height:',height);
   
   
    // console.log('crop funtion ... is success');
  }





function open_camera()
{
    //Begin start open camera
    var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        });
    }
}

function snap_shot()
{
    //snap shot image 
     // Elements for taking the snapshot
     var canvas = document.getElementById('canvas_target');
     var context = canvas.getContext('2d');
     var video = document.getElementById('video');
     context.drawImage(video, 0, 0, 640, 480);
    
         
     
    
}
