import sys
from moviepy.editor import VideoFileClip

def get_video_duration(file_path):
    try:
        clip = VideoFileClip(file_path)
        duration_in_seconds = clip.duration  # Get duration in seconds
        minutes = int(duration_in_seconds // 60)  # Calculate full minutes
        seconds = int(duration_in_seconds % 60)   # Calculate remaining seconds
        return minutes, seconds
    except Exception as e:
        print(f"Error: {e}")
        return None, None

if __name__ == "__main__":
    # Expecting the video file path as the first argument
    file_path = sys.argv[1] if len(sys.argv) > 1 else None
    if file_path:
        minutes, seconds = get_video_duration(file_path)
        if minutes is not None and seconds is not None:
            print(f"{minutes} minute{'s' if minutes != 1 else ''} and {seconds} second{'s' if seconds != 1 else ''}")
        else:
            print("Failed to retrieve duration.")
    else:
        print("No video file path provided.")
