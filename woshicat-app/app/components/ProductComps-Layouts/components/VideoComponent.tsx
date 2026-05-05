'use client';
import React from "react";

interface VideoComponentProps {
    url: string,
    alt?: string,
    width: number,
    height: number,
    type?: string,

}

const VideoComponent:React.FC<VideoComponentProps> = ({ url, alt, width, height, type }) => {
    return (
        <video className="object-cover h-full w-full" width={`${width}`} height={`${height}`} autoPlay={true} disablePictureInPicture={true} loop playsInline={true} muted={true} preload="auto" data-v-f518367b="">
            <source src={url} type={type ? type : "video/mp4"} data-v-f518367b=""/>
            Your browser does not support the video tag.
            {alt && (
                <>{alt}</>
            )}
        </video>
    );
};

export default VideoComponent;