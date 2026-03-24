'use client'
import { JSX } from 'react'

type VideoProps = {
  youTubeId: string
  isPlayList?: boolean
}

const YouTube = ({
  youTubeId,
  isPlayList,
}: VideoProps): JSX.Element => {
  const src = isPlayList
    ? `https://www.youtube.com/embed/videoseries?list=${youTubeId}&loop=1`
    : `https://www.youtube.com/embed/${youTubeId}?loop=1&playlist=${youTubeId}`

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={src}
          title="YouTube Embed"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YouTube