import Link from 'next/link';
import React from 'react'
export default function NavItem({label,href,selectIcon}  : {label:string,href:string,selectIcon? : React.ReactNode}) {
  return (
    <div className='p-2'
    >
        <Link href={href} className="text-foreground hover:text-primary 
        relative after:content-[''] after:absolute after:left-[21px]
        after:-bottom-2 after:w-[30px] after:h-[4px] after:bg-primary
        after:rounded-md after:opacity-0 hover:after:opacity-100 after:transition-opacity hover:font-bold hover:duration-300 flex gap-2 items-center
        ">
            <span>

        {label}
            </span>
        { selectIcon && selectIcon}
        </Link>
    </div>   
  )
}

