import React from 'react';

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  // We've added the new color variants to the type definition.
  variant?: "default" | "outline" | "destructive" | "secondary" | "primary" | "success" | "danger" | "outlineSmall";
  className?: string;
}) => {
  // Adjusted padding for a more standard badge appearance.
  const baseClasses = "inline-flex items-center font-normal leading-6  border-1  text-xs font-medium border";

  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200 text-[16px]",
    outline: "border-neutral-400 text-neutral-900 px-[12px] py-4px rounded-[8px] text-[16px]",
    destructive: "bg-pink-100 text-pink-700 border-pink-200 text-[16px]",
    secondary: "bg-blue-100 text-blue-700 border-blue-200 text-[16px]",
    primary: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/50",
    success: "bg-[#32B814]/10 text-[#32B814] border-[#32B814]/50",
    danger:  "bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/50",
    outlineSmall : "border-neutral-400 text-neutral-900 px-[8px] rounded-[8px] text-[12px]", 
  };

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>;
};


type SkillBadgesProps = {
  skills: string[];
  size?: "large" | "small";
};

export const SkillBadges = ({ skills, size = "large" }: SkillBadgesProps) => {
  
  const colorCycle: ( 'danger' | 'primary' | 'success' )[] = ['danger', 'primary', 'success', ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {skills?.map((skill, index) => (
        <Badge
          key={skill}
          variant={colorCycle[index % colorCycle.length]}
          className={size == 'large' ? `px-[16px] py-[8px] text-[16px] rounded-full` : `px-[10px] py-[4px] text-[12px] font-medium rounded-full`}
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
};