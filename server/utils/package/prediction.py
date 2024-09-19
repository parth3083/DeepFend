import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import transforms
from torchvision.datasets import ImageFolder
from statistics import mean
from package.ConvNext_model import ConvNeXt


class predictions():
    
    def __init__(self,model_convnext,folder_path,device):
        self.pred_real_prob = []
        self.pred_false_prob = []
        transform = transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(256),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])
        full_test_dataset = ImageFolder(folder_path, transform=transform)
        test_dataloader = DataLoader(full_test_dataset, batch_size=int(32/2), shuffle=False)
        criterion = nn.CrossEntropyLoss()
        for model_name in model_convnext:
            model_conv=ConvNeXt()
            state_dict = torch.load(model_name,map_location=torch.device('cpu'))
            model_conv.load_state_dict(state_dict)
            model_conv = model_conv.to(device)
            
            with torch.no_grad():
                for images, labels in test_dataloader:
                    images, labels = images.to(device), labels.to(device)
                    outputs = model_conv(images)
                    probabilities = F.softmax(outputs, dim=1)
                    probabilities_percent = probabilities * 100
                    real_prob = []
                    false_prob = []
                    for i in range(images.size(0)):  
                        x = probabilities_percent[i].cpu().numpy()
                        perct = probabilities_percent[i].cpu().numpy()
                        real_prob.append(perct[0])
                        false_prob.append(perct[1])
                    
                    self.pred_false_prob.append(false_prob)
                    self.pred_real_prob.append(real_prob)

    def label_cal(self):
        real_prob = self.pred_real_prob
        false_prob = self.pred_false_prob
        f_c = []
        f_p = []
        for i in range(len(real_prob[0])):
            a = real_prob[0][i]
            b = real_prob[1][i]
            c = false_prob[0][i]
            d = false_prob[1][i]
            f = mean([c,d])
            r = mean([a,b])
            if(f>=r):
                f_c.append(1)
                f_p.append(max(c,d))
            else:
                f_c.append(0)
                f_p.append(max(a,b))
        if (sum(real_prob[2]) - sum (false_prob[2])) > 30:
            f_c = [0]
        return f_c,f_p


