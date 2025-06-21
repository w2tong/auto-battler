import { cn } from "@/utils/utils";
import { NavLink } from "react-router";

import info from '@assets/ui/info.svg';
import githubLogo from '@assets/github/github-logo-white.png';
import githubMark from '@assets/github/github-mark-white.svg';

type FooterProps = { className?: string; };
export default function Footer({ className }: FooterProps) {
    return (
        <div className={cn('bg-secondary', className)}>
            <div className='max-w-lg mx-auto'>
                <nav className='grid grid-cols-3 gap-2 font-bold'>

                    <NavLink className='hover:underline' to={'/credits'}>
                        <div className='flex flex-col items-center gap-2 px-1 sm:px-6'>
                            <img className='h-8' src={info} />
                            Credits
                        </div>
                    </NavLink>

                    <a className='hover:underline' href='https://github.com/w2tong/auto-battler'>
                        <div className='flex flex-col items-center gap-2 px-1 sm:px-6'>
                            <img className='h-8' src={githubLogo} />
                            Repo
                        </div>
                    </a>

                    <a className='hover:underline' href='https://github.com/w2tong'>
                        <div className='flex flex-col items-center gap-2 px-1 sm:px-6'>
                            <img className='h-8' src={githubMark} />
                            GitHub
                        </div>
                    </a>

                </nav>
            </div>
        </div >
    );
}