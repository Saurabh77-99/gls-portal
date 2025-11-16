import React from 'react'
import Chip from '../ui/Chip'
import { Badge } from '../ui/Badge'

type DetailsCardProps = {
  type: "experiance" | "projects" | "achievements" | "certifications" | "research",
  title: string,
  description?: string,
  duration?: string,
  certificateLink?: string
  role?: string
  techStack?: string[]
  issuer?: string
  issueYear?: string | number
}


const DetailsCard = ({ type, title, description = "", duration = "", certificateLink = "", role = "", techStack = [], issuer = "", issueYear = "" }: DetailsCardProps) => {
  return (
    <div className="border border-neutral-200 rounded-lg p-4 my-4">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-[18px] font-medium text-neutral-900">
            {title} {type == 'experiance' ? <span className='gap-8'>• {role}</span> : <></>}
          </h3>
          <p className="text-[16px] text-neutral-600 font-medium my-2">
            {description}
          </p>
          {
            type == 'projects' ? <>
              {
                techStack?.length > 0 &&
                <div className='flex gap-2'>
                  {techStack.map((ts, ind) =>
                    <Badge variant="outlineSmall" key={ind}>{ts}</Badge>
                  )
                  }
                </div>
              }
            </> : <></>
          }
          <p className="text-[16px] italic text-neutral-600 leading-5 mt-1">
            {type === "certifications" ? `${issuer}` : duration}
          </p>
        </div>
        <div className="text-purple-600 underline font-normal">
          <a href="#" className="italic hover:underline flex-shrink-0">
          Certificate
        </a>
        </div>
      </div>
    </div>
  )
}

export default DetailsCard