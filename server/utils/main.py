from package.prediction import predictions
from package.preprocessing import preprocess
from PIL import Image
import statistics as st
import glob
import os


def create_gif(image_paths, output_gif_path, duration=300):
    images = [Image.open(image_path) for image_path in image_paths]

    images[0].save(
        output_gif_path,
        save_all=True,
        append_images=images[1:],
        duration=duration,
        loop=0
    )



if __name__ == "__main__":
    #PATH
    Video_path = r"D:\Code\Web Development\project\Full stack\Hackathon\server\uploads\demo.mp4"
    folder = os.getcwd()
    model_convnext = [r"D:\Code\Web Development\project\Full stack\Hackathon\server\utils\python_models\model_convnext_params_exp_2.pth",
                    r"D:\Code\Web Development\project\Full stack\Hackathon\server\utils\python_models\model_convnext_params_exp_4.pth"]
    output_gif_path = os.path.join(r"D:\Code\Web Development\project\Full stack\Hackathon\server\output","output.gif")
    folder_path = os.path.join(folder,Video_path.split('\\')[-1].split('.')[0])
    device = 'cpu'
    
    preprocess(Video_path, device,folder_path)
    pred = predictions(model_convnext, folder_path, device)
    predict_class, predict_probability = predictions.label_cal(pred)
    final_class = st.mode(predict_class)
    final_prob = []
    for i in range(len(predict_class)):
        if(predict_class[i] == final_class):
            final_prob.append(predict_probability[i])
           
    image_paths = glob.glob(f"{os.path.join(folder_path, 'id_0//*.bmp')}")
    print("PATHS : ",image_paths)
    create_gif(image_paths, output_gif_path)
    
    print("Final Class is : ", "FAKE" if final_class == 1 else "REAL")
    print("Probability : ", st.mean(final_prob))
    

    
    
    
    