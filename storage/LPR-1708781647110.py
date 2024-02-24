import numpy as np
import cv2
from easyocr import Reader

cap = cv2.VideoCapture(0)

allowchar = "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ1234567890"
minArea = 500
if not cap.isOpened():
    print("Cannot open camera")
    exit()
nplateCascade = cv2.CascadeClassifier('./haarcascade_russian_plate_number.xml')
reader = Reader(["th"],gpu=True)

while True:
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break
    #-----Convert BGR to Grayscale-----#
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    plate = nplateCascade.detectMultiScale(frame_gray, 1.08, 2)
    for (x,y,w,h) in plate :
        area = w*h
        if area > minArea :
            #-----Crop frame to only Region Of Interest-----#
            ROI = frame_gray[y:y+h, x:x+w]
            rected = cv2.rectangle(frame, (x,y), 
                                   (x+w,y+h), (0,255,0), 5)
            cv2.imshow('rected',rected)
            cv2.moveWindow('rected', 10, 500)
            #-----Perform Histogram equalization-----#
            ROI = cv2.equalizeHist(ROI)
            #-----Perform Gaussian Blur-----#
            ROI = cv2.GaussianBlur(ROI, (7, 7), 1)
            #-----Perform Binarization using Adaptive Thresholding-----#
            ROI = cv2.adaptiveThreshold(ROI, 255, 
                                        cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                        cv2.THRESH_BINARY, 11, 2)
            #-----Perform Erosion-----#
            kernel = np.ones((1,1), np.uint8)
            ROI = cv2.erode(ROI, kernel)
            cv2.imshow("ROI", ROI)
            cv2.moveWindow('ROI', 600, 10)
            #-----OCR-----#
            detected = reader.readtext(ROI,allowlist=allowchar,
                                       detail=0)
            print(detected)
    cv2.imshow('frame', frame)
    cv2.moveWindow('frame', 10, 10)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()