import Image from 'next/image'
import outerSpaceLogo from '../../../public/assets/images/outerspace-logo.png'
export default function Header() {
  return (
    <header className="w-full py-4 flex items-center justify-center ">
      <Image
        src={outerSpaceLogo}
        alt={'OUTER SPACE'}
        className="h-[70px]"
        style={{ objectFit: 'contain' }}
      />
    </header>
  )
}
