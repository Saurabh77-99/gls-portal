import React from 'react'

type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

type ProfileSectionProps = {
    name: string;
    batch: string;
    profilePhoto: string;
    branch: string;
    specialization: string;
    semester: number;
    socialLinks: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
}

const Image = ({ src, alt, width, height, className }: ImageProps) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
)

const ProfileSection = ({ name, batch, profilePhoto, branch, specialization, semester, socialLinks }: ProfileSectionProps) => {
    return (
        <div className="flex flex-col justify-center items-start gap-6">
            <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                            <Image
                                src={profilePhoto || "https://placehold.co/64x64/7c56ec/white?text=AP&font=sans"}
                                alt="Aarav Patel"
                                width={120}
                                height={120}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-start gap-4">
                            <h2 className="text-[32px] font-semibold text-gray-900">{name}</h2>
                            <div className="flex flex-col gap-2">
                             <p className=" text-neutral-600 text-[18px] font-medium leading-6">B.Tech - {branch}</p>
                            <p className="text-neutral-600 text-[18px] font-medium leading-6">Batch {batch} • Sem {semester} • {specialization}  </p>
                            </div>
                        </div>
            </div>
            <div className='gap-6'>      
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-primary-500 underline">
                    {
                        socialLinks?.github &&
                        <a href={socialLinks?.github} target="_blank" className=" font-normal text-[16px] italic">
                            Github
                        </a>
                    }
                    {
                        socialLinks?.linkedin &&

                        <a href={socialLinks?.linkedin} target="_blank" className="font-normal text-[16px] italic">
                            LinkedIn
                        </a>
                    }
                    {
                        socialLinks?.portfolio &&
                        <a href={socialLinks?.portfolio} target="_blank" className="font-normal text-[16px] italic">
                            Portfolio
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileSection