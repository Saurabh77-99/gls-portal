// scripts/seed.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcryptjs";

import Recruiter from "../models/Recruiter";
import Student from "../models/Student";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("✅ MongoDB connected for seeding");
};

const seed = async () => {
  try {
    await connectDB();

    // --- Clear existing data ---
    console.log("🧹 Clearing existing data...");
    await Recruiter.deleteMany({});
    await Student.deleteMany({});

    // --- Seed Recruiters ---
    console.log("👥 Seeding recruiters...");
    
    const recruiters = [
      {
        company: "Tech Corp",
        accessCode: await bcrypt.hash("admin123", 12),
        validTill: new Date("2030-12-31")
      },
      {
        company: "Innovation Labs",
        accessCode: await bcrypt.hash("recruiter2024", 12),
        validTill: new Date("2025-06-30")
      },
      {
        company: "Startup Hub",
        accessCode: await bcrypt.hash("startup123", 12),
        validTill: new Date("2025-12-31")
      }
    ];

    const createdRecruiters = await Recruiter.insertMany(recruiters);
    
    console.log("✅ Recruiters seeded:");
    console.log("   Company: Tech Corp | Access Code: admin123");
    console.log("   Company: Innovation Labs | Access Code: recruiter2024");
    console.log("   Company: Startup Hub | Access Code: startup123");

    // --- Seed Students ---
    console.log("🎓 Seeding students...");
    
    const students = [
      {
        name: "Aarav Patel",
        branch: "Computer Science & Engineering",
        batch: "2022-26",
        semester: 7,
        specialization: "AI/ML",
        cgpa: 9.1,
        achievements: ["Batch Topper", "Hackathon Winner", "National Level Achievement"],
        skills: ["Python", "TensorFlow", "NLP", "Machine Learning", "React", "Node.js"],
        experience: [
          {
            company: "Startup X",
            role: "Web Dev Intern",
            duration: "Jun 2024 - Aug 2024",
            description: "Built customer-facing UI & improved checkout conversion by 12%"
          }
        ],
        projects: [
          {
            title: "Gujarati TTS System",
            description: "Rule-based Gujarati text-to-speech engine deployed as serverless API",
            techStack: ["Machine Learning", "Python", "AWS Lambda"],
            links: ["https://github.com/aarav/gujarati-tts"]
          },
          {
            title: "E-commerce Site (MERN)",
            description: "Full-stack e-commerce site with payments and admin dashboard",
            techStack: ["React", "Node.js", "MongoDB"],
            links: ["https://github.com/aarav/ecommerce-mern"]
          }
        ],
        certifications: [
          { name: "AWS Cloud Practitioner", issuer: "Amazon (2024)", year: 2024 },
          { name: "TensorFlow Developer Certificate", issuer: "Google (2023)", year: 2023 }
        ],
        contact: { email: "aaravpatel@gmail.com", phone: "+91 9123456789" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-aarav/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["AI/ML", "High CGPA", "Hackathon Winner"]
      },
      {
        name: "Priya Sharma",
        branch: "Information Technology",
        batch: "2021-25",
        semester: 8,
        specialization: "Cybersecurity",
        cgpa: 8.7,
        achievements: ["CTF Finalist", "Research Paper Published"],
        skills: ["Ethical Hacking", "Networking", "Python", "Cryptography", "Linux"],
        experience: [
          {
            company: "SecureNet Solutions",
            role: "Security Analyst Intern",
            duration: "Jan 2024 - May 2024",
            description: "Conducted vulnerability assessments and penetration testing"
          }
        ],
        projects: [
          {
            title: "Network Vulnerability Scanner",
            description: "Custom tool for automated network security assessment",
            techStack: ["Python", "Nmap", "Scapy"],
            links: ["https://github.com/priya/vuln-scanner"]
          }
        ],
        certifications: [
          { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", year: 2024 }
        ],
        contact: { email: "priya.sharma@gmail.com", phone: "+91 9876543210" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-priya/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        tags: ["Cybersecurity", "Research"]
      },
      {
        name: "Rohan Kumar",
        branch: "Computer Science & Engineering",
        batch: "2022-26",
        semester: 6,
        specialization: "Full Stack Development",
        cgpa: 8.9,
        achievements: ["Open Source Contributor", "Hackathon Finalist"],
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Docker", "AWS"],
        experience: [
          {
            company: "TechStart Inc",
            role: "Frontend Developer Intern",
            duration: "May 2024 - Jul 2024",
            description: "Developed responsive web applications using React and TypeScript"
          }
        ],
        projects: [
          {
            title: "Task Management System",
            description: "Real-time collaborative task management with team features",
            techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
            links: ["https://github.com/rohan/task-manager", "https://taskapp.demo.com"]
          },
          {
            title: "Weather Dashboard",
            description: "Weather forecasting app with location-based predictions",
            techStack: ["JavaScript", "APIs", "Chart.js"],
            links: ["https://github.com/rohan/weather-app"]
          }
        ],
        certifications: [
          { name: "React Developer", issuer: "Meta", year: 2023 }
        ],
        contact: { email: "rohan.dev@gmail.com", phone: "+91 8765432109" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-rohan/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/25.jpg",
        tags: ["Full Stack", "Open Source"]
      },
      {
        name: "Anjali Singh",
        branch: "Information Technology",
        batch: "2023-27",
        semester: 4,
        specialization: "Data Science",
        cgpa: 9.3,
        achievements: ["Dean's List", "Research Assistant"],
        skills: ["Python", "R", "SQL", "Tableau", "Machine Learning", "Statistics"],
        experience: [],
        projects: [
          {
            title: "Customer Churn Prediction",
            description: "ML model to predict customer churn for telecom industry",
            techStack: ["Python", "Scikit-learn", "Pandas"],
            links: ["https://github.com/anjali/churn-prediction"]
          },
          {
            title: "Sales Analytics Dashboard",
            description: "Interactive dashboard for sales performance analysis",
            techStack: ["Tableau", "SQL", "Python"],
            links: ["https://public.tableau.com/anjali/sales-dashboard"]
          }
        ],
        certifications: [
          { name: "Google Data Analytics", issuer: "Google", year: 2024 }
        ],
        contact: { email: "anjali.ds@gmail.com", phone: "+91 7654321098" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-anjali/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/68.jpg",
        tags: ["Data Science", "High CGPA", "Research"]
      },
      {
        name: "Vikash Patel",
        branch: "Computer Science & Engineering",
        batch: "2021-25",
        semester: 8,
        specialization: "Mobile Development",
        cgpa: 8.4,
        achievements: ["App Store Featured", "Entrepreneurship Award"],
        skills: ["Flutter", "Dart", "Firebase", "React Native", "iOS", "Android"],
        experience: [
          {
            company: "Mobile Solutions Ltd",
            role: "Mobile App Developer",
            duration: "Jun 2023 - Present",
            description: "Developed cross-platform mobile applications for various clients"
          }
        ],
        projects: [
          {
            title: "Food Delivery App",
            description: "Complete food delivery solution with real-time tracking",
            techStack: ["Flutter", "Firebase", "Google Maps API"],
            links: ["https://github.com/vikash/food-delivery", "https://play.google.com/store/apps/foodie"]
          },
          {
            title: "Fitness Tracker",
            description: "Health and fitness tracking app with social features",
            techStack: ["React Native", "Node.js", "MongoDB"],
            links: ["https://github.com/vikash/fitness-tracker"]
          }
        ],
        certifications: [
          { name: "Flutter Developer", issuer: "Google", year: 2023 }
        ],
        contact: { email: "vikash.mobile@gmail.com", phone: "+91 9234567890" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-vikash/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/47.jpg",
        tags: ["Mobile Development", "Entrepreneurship"]
      },
      {
        name: "Divya Agrawal",
        branch: "Information Technology",
        batch: "2022-26",
        semester: 6,
        specialization: "Cloud Computing",
        cgpa: 8.8,
        achievements: ["AWS Hackathon Winner", "Technical Writer"],
        skills: ["AWS", "Docker", "Kubernetes", "Python", "DevOps", "Terraform"],
        experience: [
          {
            company: "CloudTech Systems",
            role: "Cloud Engineering Intern",
            duration: "Dec 2023 - Mar 2024",
            description: "Worked on container orchestration and CI/CD pipeline setup"
          }
        ],
        projects: [
          {
            title: "Microservices Architecture",
            description: "Scalable microservices platform using Docker and Kubernetes",
            techStack: ["Docker", "Kubernetes", "Python", "Redis"],
            links: ["https://github.com/divya/microservices-platform"]
          },
          {
            title: "Infrastructure as Code",
            description: "Automated AWS infrastructure provisioning using Terraform",
            techStack: ["Terraform", "AWS", "Python"],
            links: ["https://github.com/divya/terraform-aws"]
          }
        ],
        certifications: [
          { name: "AWS Solutions Architect Associate", issuer: "Amazon", year: 2024 },
          { name: "Docker Certified Associate", issuer: "Docker Inc", year: 2023 }
        ],
        contact: { email: "divya.cloud@gmail.com", phone: "+91 8123456789" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-divya/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/26.jpg",
        tags: ["Cloud Computing", "DevOps", "Hackathon Winner"]
      },
      {
        name: "Arjun Mehta",
        branch: "Computer Science & Engineering",
        batch: "2023-27",
        semester: 4,
        specialization: "Game Development",
        cgpa: 8.2,
        achievements: ["Game Jam Winner", "Unity Certified"],
        skills: ["Unity", "C#", "Blender", "Game Design", "VR/AR", "3D Modeling"],
        experience: [],
        projects: [
          {
            title: "VR Educational Game",
            description: "Virtual reality game for learning Indian history",
            techStack: ["Unity", "C#", "Oculus SDK"],
            links: ["https://github.com/arjun/vr-history-game"]
          },
          {
            title: "2D Platformer Game",
            description: "Indie platformer game with pixel art graphics",
            techStack: ["Unity", "C#", "Photoshop"],
            links: ["https://github.com/arjun/platformer-game", "https://arjun-games.itch.io/platformer"]
          }
        ],
        certifications: [
          { name: "Unity Certified User", issuer: "Unity Technologies", year: 2023 }
        ],
        contact: { email: "arjun.gamedev@gmail.com", phone: "+91 7012345678" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-arjun/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/15.jpg",
        tags: ["Game Development", "VR/AR"]
      },
      {
        name: "Sneha Reddy",
        branch: "Information Technology",
        batch: "2021-25",
        semester: 8,
        specialization: "UI/UX Design",
        cgpa: 8.6,
        achievements: ["Design Competition Winner", "Behance Featured"],
        skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "User Research", "Prototyping"],
        experience: [
          {
            company: "Design Studio Pro",
            role: "UI/UX Designer Intern",
            duration: "Aug 2023 - Dec 2023",
            description: "Designed user interfaces for mobile and web applications"
          }
        ],
        projects: [
          {
            title: "E-learning Platform Design",
            description: "Complete UI/UX design for online learning platform",
            techStack: ["Figma", "User Research", "Prototyping"],
            links: ["https://www.figma.com/sneha/elearning-design", "https://www.behance.net/sneha/projects"]
          },
          {
            title: "Banking App Redesign",
            description: "Mobile banking app interface redesign focusing on accessibility",
            techStack: ["Adobe XD", "User Testing", "Wireframing"],
            links: ["https://www.behance.net/sneha/banking-redesign"]
          }
        ],
        certifications: [
          { name: "Google UX Design", issuer: "Google", year: 2023 }
        ],
        contact: { email: "sneha.design@gmail.com", phone: "+91 6901234567" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-sneha/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/89.jpg",
        tags: ["UI/UX Design", "Creative"]
      },
      {
        name: "Karthik Nair",
        branch: "Computer Science & Engineering",
        batch: "2022-26",
        semester: 6,
        specialization: "Blockchain",
        cgpa: 8.5,
        achievements: ["Blockchain Hackathon Winner", "Research Publication"],
        skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "JavaScript"],
        experience: [
          {
            company: "CryptoTech Labs",
            role: "Blockchain Developer Intern",
            duration: "Jan 2024 - Apr 2024",
            description: "Developed smart contracts and DeFi protocols"
          }
        ],
        projects: [
          {
            title: "Decentralized Voting System",
            description: "Blockchain-based voting platform ensuring transparency",
            techStack: ["Solidity", "Web3.js", "React", "Ethereum"],
            links: ["https://github.com/karthik/voting-dapp"]
          },
          {
            title: "NFT Marketplace",
            description: "Complete NFT trading platform with wallet integration",
            techStack: ["Solidity", "React", "IPFS", "MetaMask"],
            links: ["https://github.com/karthik/nft-marketplace", "https://karthik-nfts.vercel.app"]
          }
        ],
        certifications: [
          { name: "Certified Blockchain Developer", issuer: "Blockchain Council", year: 2024 }
        ],
        contact: { email: "karthik.blockchain@gmail.com", phone: "+91 5890123456" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-karthik/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
        tags: ["Blockchain", "Web3", "Hackathon Winner"]
      },
      {
        name: "Meera Joshi",
        branch: "Information Technology",
        batch: "2023-27",
        semester: 4,
        specialization: "AI/ML",
        cgpa: 9.0,
        achievements: ["Dean's List", "Machine Learning Competition Winner"],
        skills: ["Python", "PyTorch", "Computer Vision", "NLP", "Deep Learning", "OpenCV"],
        experience: [],
        projects: [
          {
            title: "Medical Image Analysis",
            description: "Deep learning model for detecting diseases from X-ray images",
            techStack: ["Python", "PyTorch", "OpenCV", "Medical Imaging"],
            links: ["https://github.com/meera/medical-ai"]
          },
          {
            title: "Chatbot for Mental Health",
            description: "AI-powered chatbot providing mental health support",
            techStack: ["Python", "NLP", "Transformers", "Flask"],
            links: ["https://github.com/meera/mental-health-bot"]
          }
        ],
        certifications: [
          { name: "Deep Learning Specialization", issuer: "Coursera", year: 2024 }
        ],
        contact: { email: "meera.ai@gmail.com", phone: "+91 4789012345" },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-meera/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/32.jpg",
        tags: ["AI/ML", "High CGPA", "Healthcare Tech"]
      }
    ];

    const createdStudents = await Student.insertMany(students);
    console.log(`✅ ${createdStudents.length} students seeded successfully`);

    // --- Create indexes for better performance ---
    console.log("📊 Creating database indexes...");
    await Student.createIndexes();
    await Recruiter.createIndexes();
    console.log("✅ Database indexes created");

    // --- Display summary ---
    console.log("\n🎉 Seeding completed successfully!");
    console.log("📈 Database Statistics:");
    console.log(`   • Students: ${createdStudents.length}`);
    console.log(`   • Recruiters: ${createdRecruiters.length}`);
    console.log(`   • Specializations: ${[...new Set(students.map(s => s.specialization))].join(', ')}`);
    console.log(`   • Branches: ${[...new Set(students.map(s => s.branch))].join(', ')}`);
    
    console.log("\n🔑 Test Login Credentials:");
    console.log("   • admin123 (Tech Corp)");
    console.log("   • recruiter2024 (Innovation Labs)"); 
    console.log("   • startup123 (Startup Hub)");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log("🚪 MongoDB connection closed");
  }
};

// Execute seeding
seed()
  .then(() => {
    console.log("🎯 Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding process failed:", error);
    process.exit(1);
  });