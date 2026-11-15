#!/bin/bash
# This script processes a video file by extracting frames and saving them in a specified directory.
# Usage: process.sh <input_video> <output_directory>

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_video> <output_directory>"
    exit 1
fi

input_video="$1"
output_directory="$2"

if [ ! -f "$input_video" ]; then
    echo "Input video file does not exist: $input_video"
    exit 1
fi

if [ ! -d "$output_directory" ]; then
    echo "Output directory does not exist. Creating: $output_directory"
    mkdir -p "$output_directory"
fi

if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg could not be found. Please install ffmpeg to proceed."
    echo "You can install ffmpeg using your package manager, e.g., 'sudo apt update && sudo apt install -y ffmpeg'"
    exit 1
fi

# Keep transparency but optimise size by using lossy WebP
ffmpeg -c:v libvpx-vp9 -i "$input_video" \
    -vf 'scale=1920:1080' \
    -pix_fmt bgra \
    -lossless 1 \
    -c:v libwebp \
    -y "$output_directory"/%03d.webp

if [ $? -ne 0 ]; then
    echo "Error processing video file: $input_video"
    exit 1
fi

echo "Video processing complete. Frames saved to: $output_directory"
exit 0
