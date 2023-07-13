import type { PropsWithChildren } from 'react'
import { ArrowLeft, Clipboard, Copy, GitBranch, Sliders } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';

interface IProjectLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
}

const ProjectLayout = ({ children, title, description }: IProjectLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <main>
      <div className="flex items-center gap-4">
        <IconButton icon={<ArrowLeft />} onClick={()=>navigate(-1)} variant='primary' />
        <div>
          <h2 className="text-h2">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="my-12 flex gap-16 items-center relative">
        <Link to="/">
          <div className="flex gap-4 items-center">
            <Copy className="w-5 h-5" /> Environments
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-4 items-center">
            <Clipboard className="w-5 h-5" /> Test Cases
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-4 items-center">
            <Sliders className="w-5 h-5" /> Settings
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-4 items-center">
            <GitBranch className="w-5 h-5" /> Activities
          </div>
        </Link>
        <div className="w-32 h-1 bg-primary absolute -bottom-3 left-3"></div>
      </div>
      {children}
    </main>
  )
}

export default ProjectLayout