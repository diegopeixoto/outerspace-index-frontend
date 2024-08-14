import Image from 'next/image'
import outerSpaceLogo from '../../../public/assets/images/outerspace-logo.png'
export default function Header() {
  return (
    <header className="w-full py-4 flex items-center justify-center ">
      <div className="relative w-[156px] h-[70px]">
        <Image src={outerSpaceLogo} alt={'OUTER SPACE'} fill sizes="156" />
      </div>
    </header>
  )
}
