import Image from 'next/image'

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="relative w-[60px] h-[60px] ">
      <Image src={src} alt="avatar" fill className="rounded-md" sizes="60px" />
    </div>
  )
}
