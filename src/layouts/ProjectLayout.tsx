import type { PropsWithChildren } from 'react'
import { ArrowLeft, Clipboard, Copy, GitBranch, Sliders } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';

interface IProjectLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

const ProjectLayout = ({ children, title, description }: IProjectLayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/")[4];
  const newPathname = pathname.split("/").slice(0, 4).join("/");
  
  return (
    <main>
      <div className="flex items-center gap-4">
        <IconButton icon={<ArrowLeft />} onClick={()=>navigate('/polaris/projects')} variant='primary' />
        <div>
          <h2 className="text-h2">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="my-12 flex gap-16 items-center relative">
        <Link to={newPathname}>
          <div className={`flex gap-4 items-center pb-2 transition-all ${path===undefined&&'border-b-4 border-primary'}`}>
            <Copy className="w-5 h-5" /> Environments
          </div>
        </Link>
        <Link to={`${newPathname}/test-cases`}>
          <div className={`flex gap-4 items-center pb-2 transition-all ${path==='test-cases'&&'border-b-4 border-primary'}`}>
            <Clipboard className="w-5 h-5" /> Test Cases
          </div>
        </Link>
        <Link to={`${newPathname}/settings`}>
          <div className={`flex gap-4 items-center pb-2 transition-all ${path==='settings'&&'border-b-4 border-primary'}`}>
            <Sliders className="w-5 h-5" /> Settings
          </div>
        </Link>
        <Link to={`${newPathname}/activities`}>
          <div className={`flex gap-4 items-center pb-2 transition-all ${path==='activities'&&'border-b-4 border-primary'}`}>
            <GitBranch className="w-5 h-5" /> Activities
          </div>
        </Link>
        {/* <div className="w-32 h-1 bg-primary absolute -bottom-3 left-3"></div> */}
      </div>
      {children}
    </main>
  )
}

export default ProjectLayout