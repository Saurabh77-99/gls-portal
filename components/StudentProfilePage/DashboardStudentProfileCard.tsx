import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SkillBadges } from '../ui/Badge';

const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

interface StudentProfileCardProps {
  student?: {
    id: string;
    name: string;
    degree: string;
    batch: string;
    semester: string;
    specialization: string;
    description: string;
    profileImage: string;
    badges: Array<{
      text: string;
      variant: "destructive" | "secondary" | "success" | "warning";
      icon?: string;
    }>;
  };
  onViewProfile?: (studentId: string) => void;
}

const DashboardStudentProfileCard: React.FC<StudentProfileCardProps> = ({ 
  student = {
    id: "1",
    name: "Aarav Patel",
    degree: "B.Tech - Computer Science & Engineering",
    batch: "Batch 2022-26",
    semester: "Sem 7",
    specialization: "AI/ML",
    description: "AI/ML enthusiast • Built a Gujarati TTS system • Likes to explore core Machine Learning",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: [
      { text: "Batch Topper", variant: "destructive", icon: "🎓" },
      { text: "Hackathon Winner", variant: "secondary", icon: "🏆" },
      { text: "National Level Achievement", variant: "success", icon: "🏅" },
      { text: "High CGPA", variant: "warning" },
    ]
  }, 
  onViewProfile 
}) => {
  
  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(student.id);
    }
  };

  return (
    <div className="w-[442px] h-[251px] bg-neutral-100 border border-b-neutral-200 rounded-3xl p-4 ">
      {/* Profile Section */}
      <div className="max-w[410px] flex items-start gap-6 mb-2">
        <div className="relative flex-shrink-0">
          <Image
            src={student.profilePhoto}
            alt={student.name}
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-gray-100"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{student.name}</h2>
          <p className="text-gray-600 text-base mb-1">{student.degree}</p>
          <p className="text-gray-600 text-base">
            {student.batch} • {student.semester} • {student.specialization}
          </p>
        </div>
      </div>

      {/* Separator Line */}
      <div className="h-px bg-gray-200 mb-6"></div>

      {/* Description */}
      <p className="text-gray-700 text-base mb-8 leading-relaxed">
        {student?.overview}
      </p>

      {/* Badges and View Profile Button */}
      <div className="relative">
        <SkillBadges size='small' skills={student?.tags}/>
        <button
          onClick={handleViewProfile}
          className="absolute bottom-0 right-0 flex items-center gap-2 text-purple-600 hover:text-purple-700 text-lg font-medium transition-colors group"
        >
          View Profile
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DashboardStudentProfileCard;