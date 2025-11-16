import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SkillBadges } from '../ui/Badge';
import { Student } from '@/store/store';

type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const Image = ({ src, alt, width, height, className }: ImageProps) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

interface StudentProfileCardProps {
  student: Student;
  onViewProfile?: (studentId: string) => void;
}

const DashboardStudentProfileCard = ({ 
  student, 
  onViewProfile 
}: StudentProfileCardProps) => {

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(student?._id);
    }
  };

  return (
    <div className="w-[442px] bg-neutral-100 border border-neutral-200 rounded-3xl p-6 flex flex-col">
      {/* Profile Section */}
      <div className="flex items-start gap-5 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={student.profilePhoto}
            alt={student.name}
            width={80}
            height={80}
            className="rounded-full object-cover w-20 h-20 border-2 border-neutral-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-1 leading-tight">{student.name}</h2>
          <p className="text-neutral-700 text-sm font-medium mb-1">{student.degree || `B.Tech - ${student.branch}`}</p>
          <p className="text-neutral-600 text-sm">
            Batch {student.batch} • Sem {student.semester} • {student.specialization}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-700 text-sm mb-4 leading-relaxed line-clamp-2">
        {student?.overview}
      </p>

      {/* Badges and View Profile Button */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex-1">
          <SkillBadges size='small' skills={student?.tags || []}/>
        </div>
        <button
          onClick={handleViewProfile}
          className="flex items-center gap-1 text-[#5B2CE7] hover:text-[#4818D7] text-base font-medium transition-colors ml-4 flex-shrink-0 group"
        >
          View Profile
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DashboardStudentProfileCard;