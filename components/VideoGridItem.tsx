"use client"

import { formatDuration } from "@/utils/formatDuration"
import { formatTimeAgo } from "@/utils/formatTimeAgo"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type VideoGridItemProps = {
  id: string,
  title: string,
  channel: {
    id: string,
    name: string,
    profileUrl: string,
  }  
  views: number,
  postedAt: Date,
  duration: number,
  thumbnailUrl: string
  videoUrl: string,

}

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {notation: "compact"})

export const VideoGridItem = ({id,title, channel, views, postedAt, duration, thumbnailUrl, videoUrl}: VideoGridItemProps) => {
    const [isVideoplaying, setIsVideoplaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
      if(videoRef.current == null) return
    
      if(isVideoplaying){
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }else{
        videoRef.current.pause()
      }

    }, [isVideoplaying])
    


    return (
    <div 
        className="flex flex-col gap-2"
        onMouseEnter={()=>{setIsVideoplaying(true)}}
        onMouseLeave={()=>{setIsVideoplaying(false)}}
    >
        <a href={`/watch?v=${id}`} className="relative aspect-video">
            <img  src={thumbnailUrl} alt="" className={`block w-full h-full object-cover transition-[border-radious] duration-200 ${isVideoplaying ? "rounded-none" : "rounded-xl"}`}/>

            <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                {formatDuration(duration)}
            </div>
            <video className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoplaying ? "opacity-100 delay-200" : "opacity-0"} `} ref={videoRef} muted playsInline src={videoUrl}></video>
        </a>
        <div className="flex gap-2 ">
            <a href={`/@${channel.id}`} className="flex-shrink-0">
                <img  alt="" src={channel.profileUrl} className="w-12 h-12 rounded-full"/>
            </a>
            <div className="flex flex-col">
                <a href={`/watch?v=${id}`} className="font-bold">{title}</a>
                <a href={`/@${channel.id}`} className="text-secondary-text test-sm">
                    {channel.name}
                </a>
                <div className="text-secondary text-sm">
                    {VIEW_FORMATTER.format(views)} views • {formatTimeAgo(postedAt)}
                </div>
            </div>
        </div>
    </div>
  )
}
