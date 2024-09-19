import json
import glob
import os
import statistics as st
from PIL import Image
from tinytag import TinyTag
from package.prediction import predictions
from package.preprocessing import preprocess

def create_gif(image_paths, output_gif_path, duration=300):
    images = [Image.open(image_path) for image_path in image_paths]
    images[0].save(
        output_gif_path,
        save_all=True,
        append_images=images[1:],
        duration=duration,
        loop=0
    )

def output_results(final_class, final_prob_mean, metadata):
    return {
        "final_class": final_class,
        "final_probability": final_prob_mean,
        "metadata": metadata
    }

if __name__ == "__main__":
    import sys

    Video_path = sys.argv[1]
    folder = os.getcwd()
    model_convnext = [r"D:\Code\Web Development\project\Full stack\Hackathon\server\utils\python_models\model_convnext_params_exp_2.pth",
                     r"D:\Code\Web Development\project\Full stack\Hackathon\server\utils\python_models\model_convnext_params_exp_4.pth",r"D:\Code\Web Development\project\Full stack\Hackathon\server\utils\python_models\model_convnext_params_exp_5.pth"]
    output_gif_path = os.path.join(r"D:\Code\Web Development\project\Full stack\Hackathon\server\output", "output.gif")
    folder_path = os.path.join(folder, Video_path.split('\\')[-1].split('.')[0])
    device = 'cpu'
    trimmer = [0, 0, 0, 5]

    # preprocess(Video_path, device, folder_path, trimmer)
    pred = predictions(model_convnext, folder_path, device)
    predict_class, predict_probability = predictions.label_cal(pred)
    final_class = st.mode(predict_class)
    final_prob = [predict_probability[i] for i in range(len(predict_class)) if predict_class[i] == final_class]

    image_paths = glob.glob(f"{os.path.join(folder_path, 'id_0//*.bmp')}")
    create_gif(image_paths, output_gif_path)

    final_class_str = "FAKE" if final_class == 1 else "REAL"
    final_prob_mean = float(st.mean(final_prob))-2.9  

    # Extract metadata
    vid = TinyTag.get(Video_path)
    metadata = {
        "title": vid.title or "Unknown",
        "size": f"{vid.filesize / 1024:.2f} KB",
        "source": vid.year or "Unknown",
        "duration": vid.duration or "Unknown",
        "bitrate": vid.bitrate or "Unknown"
    }

    # Output JSON to stdout
    output_data = output_results(final_class_str, final_prob_mean, metadata)
    print(json.dumps(output_data))


