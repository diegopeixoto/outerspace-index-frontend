import Image from 'next/image'

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="relative w-[60px] h-[60px] ">
      <Image
        src={src}
        alt="avatar"
        fill
        objectFit="contain"
        className="rounded-md"
      />
    </div>
  )
}
