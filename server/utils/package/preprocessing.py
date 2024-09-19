import cv2
import numpy as np
from dface import MTCNN, FaceNet
from sklearn.cluster import DBSCAN
import os
from PIL import Image

class preprocess():
    
    def __init__(self,Video_path,device,out_path):

        video = Video_path

        mtcnn = MTCNN(device)
        facenet = FaceNet(device)

        frames = self.get_frames(video)
        result = mtcnn.detect(frames)

        faces = []
        for i, res in enumerate(result):
            if res is None:
                continue
            # extract faces
            boxes, probs, lands = res
            for j, box in enumerate(boxes):
                # confidence of detected face
                if probs[j] > 0.98:
                    h, w = frames[i].shape[:2]
                    x1, y1, size = self.get_boundingbox(box, w, h)
                    face = frames[i][y1:y1+size, x1:x1+size]
                    faces.append(face)

        embeds = facenet.embedding(faces)

        dbscan = DBSCAN(eps=0.35, metric='cosine', min_samples=5)
        labels = dbscan.fit_predict(embeds)

        name = out_path
        os.mkdir(name)

        print("saving clustered faces.")
        for i in range(len(labels)):
            label = labels[i]
            if label < 0:
                continue
            id_dir = '%s\\id_%d'%(name, label)
            if not os.path.exists(id_dir):
                os.mkdir(id_dir)
            face = Image.fromarray(faces[i])
            face.save('%s\\%d.bmp'%(id_dir, i))
    
    
    def get_frames(self, video):
        frames = []
        vid = cv2.VideoCapture(video)
        total = int(vid.get(cv2.CAP_PROP_FRAME_COUNT))
        nframe = total//30
        idx = np.linspace(0, total, nframe, endpoint=False, dtype=int)
        for i in range(total):
            ok = vid.grab()
            if i not in idx:
                continue
            ok, frm = vid.retrieve()
            if not ok:
                continue
            frm = cv2.cvtColor(frm, cv2.COLOR_BGR2RGB)
            frames.append(frm)
        vid.release()
        return frames


    def get_boundingbox(self, box, w, h, scale=1.2):
        x1, y1, x2, y2 = box
        size = int(max(x2-x1, y2-y1) * scale)
        center_x, center_y = (x1 + x2) // 2, (y1 + y2) // 2
        if size > w or size > h:
            size = int(max(x2-x1, y2-y1))
        x1 = max(int(center_x - size // 2), 0)
        y1 = max(int(center_y - size // 2), 0)
        size = min(w - x1, size)
        size = min(h - y1, size)
        return x1, y1, size
  
