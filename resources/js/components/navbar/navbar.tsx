import logo from '@/images/logo.png'
import NavLg from "./nav-lg"
import NavSm from './nav-sm'
import { Link } from '@inertiajs/react'

export default () => {
    return (
        <nav className="relative h-16">
            <div className="z-30 fixed bg-background p-4 border-b w-full">
                <div className="mx-auto container">
                    <div className="flex justify-between items-center">
                        <Link href='/' className="flex items-center gap-4">
                            <img loading='lazy' src={logo} alt="Surabaya Logo" className="h-10" />
                            <div className="text-xl"> <span className='text-primary'>HIMMAH</span> <span>Campus Expo</span></div>
                        </Link>
                        <NavLg />
                        <NavSm />
                    </div>
                </div>
            </div>
        </nav>
    )
}