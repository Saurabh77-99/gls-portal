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
        previousSemesterCgpa: 8.9,
        overview: "AI/ML enthusiast with experience in building intelligent systems. Built a Gujarati TTS system and loves exploring core Machine Learning concepts.",
        achievements: [
          {
            title: "Smart India Hackathon Finalist",
            description: "Finalist in Smart India Hackathon 2024 for developing an AI-powered educational platform",
            date: "Coimbatore, 2024"
          },
          {
            title: "#1 at Breach 25 FinTech Hackathon",
            description: "Won first place in FinTech hackathon for developing a blockchain-based payment solution",
            date: "Gandhinagar, 2025"
          }
        ],
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
            description: "Rule-based Gujarati text-to-speech engine deployed as serverless API.",
            techStack: ["Machine Learning", "Python", "AWS Lambda"],
            links: ["https://github.com/aarav/gujarati-tts"],
            githubUrl: "https://github.com/aarav/gujarati-tts",
            livePreview: "https://gujarati-tts.vercel.app"
          },
          {
            title: "E-commerce Site (MERN)",
            description: "Full-stack e-commerce site with payments and admin dashboard.",
            techStack: ["React", "Node.js", "MongoDB"],
            links: ["https://github.com/aarav/ecommerce-mern"],
            githubUrl: "https://github.com/aarav/ecommerce-mern"
          }
        ],
        certifications: [
          { 
            name: "AWS Cloud Practitioner", 
            issuer: "Amazon", 
            year: 2024,
            certificate: "https://aws.com/certificates/aarav-aws"
          },
          { 
            name: "TensorFlow Developer Certificate", 
            issuer: "Google", 
            year: 2023,
            certificate: "https://tensorflow.org/certificates/aarav-tf"
          }
        ],
        researchPublications: [
          {
            title: "Gujarati TTS: Rule-based Approach",
            journal: "IEEE Workshop 2024",
            year: 2024,
            authors: ["Aarav Patel", "Dr. Smith"],
            paperUrl: "https://ieee.org/papers/gujarati-tts"
          }
        ],
        contact: { email: "aaravpatel@gmail.com", phone: "+91 9123456789" },
        socialLinks: {
          github: "https://github.com/aaravpatel",
          linkedin: "https://linkedin.com/in/aaravpatel",
          portfolio: "https://aaravpatel.dev"
        },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-aarav/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["AI/ML", "High CGPA", "Hackathon Winner"],
        languagesKnown: ["English", "Hindi", "Gujarati"],
        preferences: {
          location: ["Ahmedabad", "Mumbai", "Bangalore"],
          jobType: ["Full-time", "Internship"],
          role: ["Software Engineer", "ML Engineer", "Data Scientist"],
          industries: ["Technology", "AI/ML", "FinTech"]
        }
      },
      {
        name: "Priya Sharma",
        branch: "Computer Science & Engineering",
        batch: "2021-25",
        semester: 8,
        specialization: "Web Development",
        cgpa: 8.7,
        previousSemesterCgpa: 8.5,
        overview: "Full-stack developer passionate about creating scalable web applications and user-friendly interfaces.",
        achievements: [
          {
            title: "Best Final Year Project",
            description: "Won best project award for developing a real-time collaboration platform",
            date: "2024"
          }
        ],
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS", "Docker"],
        experience: [
          {
            company: "WebTech Solutions",
            role: "Frontend Developer Intern",
            duration: "Dec 2023 - Mar 2024",
            description: "Developed responsive web applications using React and improved user experience"
          }
        ],
        projects: [
          {
            title: "Real-time Chat Application",
            description: "Full-stack chat app with real-time messaging and file sharing capabilities",
            techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
            links: ["https://github.com/priya/chat-app"],
            githubUrl: "https://github.com/priya/chat-app",
            livePreview: "https://chat-app-priya.vercel.app"
          }
        ],
        certifications: [
          {
            name: "React Developer Certification",
            issuer: "Meta",
            year: 2024,
            certificate: "https://meta.com/certificates/priya-react"
          }
        ],
        researchPublications: [],
        contact: { email: "priya.sharma@student.gls.edu.in", phone: "+91 9876543210" },
        socialLinks: {
          github: "https://github.com/priyasharma",
          linkedin: "https://linkedin.com/in/priyasharma"
        },
        resumeUrl: "https://drive.google.com/file/d/priya-resume/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        tags: ["Web Development", "Full Stack"],
        languagesKnown: ["English", "Hindi"],
        preferences: {
          location: ["Delhi", "Gurgaon", "Noida"],
          jobType: ["Full-time"],
          role: ["Frontend Developer", "Full Stack Developer"],
          industries: ["Technology", "E-commerce", "EdTech"]
        }
      },
      {
        name: "Krish Dobariya",
        branch: "Computer Science & Engineering",
        batch: "2021-25",
        semester: 7,
        specialization: "AI/ML",
        cgpa: 9.3,
        previousSemesterCgpa: 9.1,
        overview: "Machine Learning enthusiast with strong programming skills and competition experience.",
        achievements: [
          {
            title: "Kaggle Competition Winner",
            description: "Won first place in Kaggle machine learning competition for sentiment analysis",
            date: "2024"
          }
        ],
        skills: ["Python", "Deep Learning", "TensorFlow", "PyTorch", "Data Analysis"],
        experience: [
          {
            company: "AI Labs",
            role: "ML Intern",
            duration: "Mar 2024 - Jun 2024",
            description: "Worked on NLP models for text classification and sentiment analysis"
          }
        ],
        projects: [
          {
            title: "Chatbot System",
            description: "AI-powered chatbot for customer service with natural language understanding",
            techStack: ["Python", "TensorFlow", "Flask"],
            links: ["https://github.com/krish/chatbot"],
            githubUrl: "https://github.com/krish/chatbot"
          }
        ],
        certifications: [
          {
            name: "Deep Learning Specialization",
            issuer: "Coursera",
            year: 2024,
            certificate: "https://coursera.org/certificates/krish-dl"
          }
        ],
        researchPublications: [],
        contact: { email: "krish.dobariya@student.gls.edu.in", phone: "+91 9000000010" },
        socialLinks: {
          github: "https://github.com/krishdobariya",
          linkedin: "https://linkedin.com/in/krishdobariya"
        },
        resumeUrl: "https://drive.google.com/file/d/krish-resume/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/20.jpg",
        tags: ["AI/ML", "High CGPA", "Competition Winner"],
        languagesKnown: ["English", "Hindi", "Gujarati"],
        preferences: {
          location: ["Bangalore", "Hyderabad", "Pune"],
          jobType: ["Full-time", "Internship"],
          role: ["ML Engineer", "Data Scientist", "AI Developer"],
          industries: ["Technology", "AI/ML", "Research"]
        }
      },
      {
        name: "Anjali Singh",
        branch: "Computer Science & Engineering",
        batch: "2023-27",
        semester: 4,
        specialization: "Data Science",
        cgpa: 9.3,
        previousSemesterCgpa: 9.0,
        overview: "Data Science enthusiast with strong analytical skills and research experience.",
        achievements: [
          {
            title: "Dean's List",
            description: "Consistently maintained high academic performance and made it to Dean's List",
            date: "2024"
          },
          {
            title: "Research Assistant",
            description: "Selected as research assistant for data analytics project under faculty guidance",
            date: "2024"
          }
        ],
        skills: ["Python", "R", "SQL", "Tableau", "Machine Learning", "Statistics"],
        experience: [],
        projects: [
          {
            title: "Customer Churn Prediction",
            description: "ML model to predict customer churn for telecom industry using various algorithms",
            techStack: ["Python", "Scikit-learn", "Pandas"],
            links: ["https://github.com/anjali/churn-prediction"],
            githubUrl: "https://github.com/anjali/churn-prediction"
          },
          {
            title: "Sales Analytics Dashboard",
            description: "Interactive dashboard for sales performance analysis with real-time data visualization",
            techStack: ["Tableau", "SQL", "Python"],
            links: ["https://public.tableau.com/anjali/sales-dashboard"],
            livePreview: "https://public.tableau.com/anjali/sales-dashboard"
          }
        ],
        certifications: [
          {
            name: "Google Data Analytics",
            issuer: "Google",
            year: 2024,
            certificate: "https://google.com/certificates/anjali-analytics"
          }
        ],
        researchPublications: [],
        contact: { email: "anjali.ds@gmail.com", phone: "+91 7654321098" },
        socialLinks: {
          github: "https://github.com/anjalisingh",
          linkedin: "https://linkedin.com/in/anjalisingh"
        },
        resumeUrl: "https://drive.google.com/file/d/sample-resume-anjali/view",
        profilePhoto: "https://randomuser.me/api/portraits/women/68.jpg",
        tags: ["Data Science", "High CGPA", "Research"],
        languagesKnown: ["English", "Hindi"],
        preferences: {
          location: ["Mumbai", "Pune", "Delhi"],
          jobType: ["Full-time", "Internship"],
          role: ["Data Analyst", "Data Scientist", "Business Analyst"],
          industries: ["Technology", "Finance", "Healthcare"]
        }
      },
      {
        name: "Masoom Patel",
        branch: "Computer Science & Engineering",
        batch: "2022-26",
        semester: 6,
        specialization: "Data Science",
        cgpa: 9.2,
        previousSemesterCgpa: 8.8,
        overview: "Data Science student with published research and hands-on experience in data analysis.",
        achievements: [
          {
            title: "Paper Published",
            description: "Published research paper on machine learning applications in education",
            date: "2024"
          }
        ],
        skills: ["Python", "R", "Data Analysis", "Machine Learning", "Statistical Modeling"],
        experience: [
          {
            company: "Analytics Co.",
            role: "Data Intern",
            duration: "May 2024 - Jul 2024",
            description: "Analyzed student datasets and created predictive models for academic performance"
          }
        ],
        projects: [
          {
            title: "Placement Prediction Model",
            description: "ML model for predicting student placement outcomes based on academic and skill data",
            techStack: ["Python", "Scikit-learn", "Pandas"],
            links: ["https://github.com/masoom/placement-ml"],
            githubUrl: "https://github.com/masoom/placement-ml"
          }
        ],
        certifications: [
          {
            name: "Data Science Specialization",
            issuer: "Coursera",
            year: 2024,
            certificate: "https://coursera.org/certificates/masoom-ds"
          }
        ],
        researchPublications: [
          {
            title: "ML Applications in Educational Data Mining",
            journal: "International Journal of Educational Technology",
            year: 2024,
            authors: ["Masoom Patel", "Dr. Johnson"],
            paperUrl: "https://journal.edu/papers/masoom-ml-education"
          }
        ],
        contact: { email: "masoom.patel@student.gls.edu.in", phone: "+91 9000000004" },
        socialLinks: {
          github: "https://github.com/masoompatel",
          linkedin: "https://linkedin.com/in/masoompatel"
        },
        resumeUrl: "https://drive.google.com/file/d/masoom-resume/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/14.jpg",
        tags: ["Data Science", "Research", "Published Author"],
        languagesKnown: ["English", "Hindi", "Gujarati"],
        preferences: {
          location: ["Ahmedabad", "Bangalore", "Chennai"],
          jobType: ["Full-time", "Research"],
          role: ["Data Scientist", "Research Analyst", "ML Engineer"],
          industries: ["Technology", "Education", "Research"]
        }
      },
      {
        name: "Rahul Gupta",
        branch: "Computer Science & Engineering",
        batch: "2020-24",
        semester: 8,
        specialization: "Software Development",
        cgpa: 8.9,
        previousSemesterCgpa: 8.7,
        overview: "Software developer with experience in building scalable applications and cloud technologies.",
        achievements: [
          {
            title: "Coding Competition Winner",
            description: "Won inter-college coding competition for algorithmic problem solving",
            date: "2023"
          }
        ],
        skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "AWS"],
        experience: [
          {
            company: "Cloud Solutions Inc",
            role: "Backend Developer Intern",
            duration: "Jan 2024 - Apr 2024",
            description: "Developed microservices architecture and implemented cloud-based solutions"
          }
        ],
        projects: [
          {
            title: "E-learning Platform",
            description: "Comprehensive e-learning platform with video streaming and assessment features",
            techStack: ["Java", "Spring Boot", "React", "MySQL"],
            links: ["https://github.com/rahul/elearning"],
            githubUrl: "https://github.com/rahul/elearning",
            livePreview: "https://elearning-rahul.herokuapp.com"
          }
        ],
        certifications: [
          {
            name: "AWS Solutions Architect",
            issuer: "Amazon",
            year: 2024,
            certificate: "https://aws.com/certificates/rahul-architect"
          }
        ],
        researchPublications: [],
        contact: { email: "rahul.gupta@student.gls.edu.in", phone: "+91 9876543211" },
        socialLinks: {
          github: "https://github.com/rahulgupta",
          linkedin: "https://linkedin.com/in/rahulgupta"
        },
        resumeUrl: "https://drive.google.com/file/d/rahul-resume/view",
        profilePhoto: "https://randomuser.me/api/portraits/men/55.jpg",
        tags: ["Software Development", "Cloud", "Backend"],
        languagesKnown: ["English", "Hindi"],
        preferences: {
          location: ["Mumbai", "Bangalore", "Hyderabad"],
          jobType: ["Full-time"],
          role: ["Software Engineer", "Backend Developer", "Cloud Engineer"],
          industries: ["Technology", "Cloud Computing", "EdTech"]
        }
      }
    ];

    const createdStudents = await Student.insertMany(students);
    console.log(`✅ ${createdStudents.length} students seeded successfully!`);

    // Log summary
    console.log("\n📊 Seed Summary:");
    console.log(`   - Recruiters: ${createdRecruiters.length}`);
    console.log(`   - Students: ${createdStudents.length}`);
    console.log("\n🎉 Database seeded successfully!");
    
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  }
};

seed();