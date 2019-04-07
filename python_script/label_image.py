# TAIDUM CLASSIFICATION IMAGE
# BY Phonratichai wairotchanaphuttha
#
#   
# ==============================================================================
from classifier_fucntion import *
import argparse
import sys


#gui import
from tkinter import *

refPt = []
cropping = False
label_name = "D:/Electron/electron-taidum/python_script/taidum_full(edit2)_labels.txt"
model_name = "D:/Electron/electron-taidum/python_script/taidam_full(edit2)_graph.pb" 
#image = cv2.imread('IMG_20181002_0035_069.jpg')
#click and crop function
def click_and_crop(event, x, y, flags, param):
  # grab references to the global variables
  global refPt, cropping, image_name
  
  image_name = 'cupture_image/frame_20.jpg'
  image = cv2.imread(image_name)
  

  # if the left mouse button was clicked, record the starting
  # (x, y) coordinates and indicate that cropping is being
  # performed
  if event == cv2.EVENT_LBUTTONDOWN:
    print('drang drop work')
    refPt = [(x, y)]
    cropping = True

  # check to see if the left mouse button was released
  elif event == cv2.EVENT_LBUTTONUP:
    print('drang drop work')
    # record the ending (x, y) coordinates and indicate that
    # the cropping operation is finished
    refPt.append((x, y))
    cropping = False

    # draw a rectangle around the region of interest
    cv2.rectangle(image, refPt[0], refPt[1], (0, 255, 0), 2)
    cv2.imshow("image", image)
    #resize image and predict
   
def predic_taidum(image_name):
  print("predic image...."+image_name)
  # load image
  image_data = load_image(image_name)
  # load labels
  labels = load_labels(label_name)
  # load graph, which is stored in the default session
  load_graph(model_name)
  #5 = run of prediction
  run_graph(image_data, labels,'DecodeJpeg/contents:0' ,'final_result:0',2)
  print("predict complete!!")
      
  

def capture_image(image_name):
  image = cv2.imread(image_name)
  clone = image.copy()
  cv2.namedWindow("image")
  cv2.setMouseCallback("image", click_and_crop)
  while True:

    # display the image and wait for a keypress
    cv2.imshow("image", image)
    key = cv2.waitKey(1) & 0xFF
    # if the 'r' key is pressed, reset the cropping region
    if key == ord("r"):
      image = clone.copy()
    # if the 'c' key is pressed, break from the loop
    elif key == ord("c"):
      break
    # if there are two reference points, then crop the region of interest
    # from teh image and display it
    if len(refPt) == 2:
      roi_image = clone[refPt[0][1]:refPt[1][1], refPt[0][0]:refPt[1][0]]
      cv2.imshow("ROI", roi_image)
      resize_image_name = 'new_resize.jpg'
      cv2.imwrite(resize_image_name,roi_image)
      print('resize and save new image')
      predic_taidum(resize_image_name)
      break
      cv2.destroyAllWindows()
     
        
        
       
        
           
 

class GUI(Frame):

    def __init__(self,master=None):
        Frame.__init__(self, master)
        self.grid()
        def open_camera():
          
          cap = cv2.VideoCapture(0)
          currentframe = 0
          while(1):
            ret, frame = cap.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            cv2.imshow('frame', gray)
            currentframe += 1
            if currentframe == 20:
              name = './cupture_image/frame_'+str(currentframe)+'.jpg'
              print('Cap && Creating...'+name)
              cv2.imwrite(name, frame)
              print("capture image")
              capture_image(name)
              cap.release()
              break
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
              break
        self.opencameraButton = Button(master, text="open camera", command=open_camera)
        self.opencameraButton.grid()
        
if __name__ == '__main__':

 
  print("starting program")
  guiFrame = GUI()
  guiFrame.mainloop()
  
  #predic_taidum('new_resize.jpg')
  
  
