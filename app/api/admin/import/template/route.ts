import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { validateAdminAuthentication } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const auth = validateAdminAuthentication(request);
    if (!auth.isValid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    // Create Excel template with headers and sample data
    const templateData = [
      {
        "Name": "Aarav Patel",
        "Branch": "Computer Science & Engineering", 
        "Batch": "2022-26",
        "Semester": 7,
        "Specialization": "AI/ML",
        "CGPA": 9.1,
        "Email": "aarav.patel@student.gls.edu.in",
        "Phone": "+91 9123456789",
        "Skills": "Python, TensorFlow, Machine Learning, React",
        "Achievements": "Batch Topper, Hackathon Winner, National Level Achievement",
        "Tags": "AI/ML, High CGPA, Hackathon Winner",
        "Resume URL": "https://drive.google.com/file/d/sample-resume/view",
        "Profile Photo": "https://randomuser.me/api/portraits/men/32.jpg",
        "Experience": "Startup X",
        "Experience Role": "Web Dev Intern", 
        "Experience Duration": "Jun 2024 - Aug 2024",
        "Experience Description": "Built customer-facing UI & improved checkout conversion by 12%",
        "Projects": "Gujarati TTS System",
        "Project Description": "Rule-based Gujarati text-to-speech engine deployed as serverless API",
        "Project Tech": "Machine Learning, Python, AWS Lambda",
        "Project Links": "https://github.com/aarav/gujarati-tts",
        "Certifications": "AWS Cloud Practitioner",
        "Certification Issuer": "Amazon",
        "Certification Year": 2024
      },
      {
        "Name": "Priya Sharma",
        "Branch": "Information Technology",
        "Batch": "2021-25", 
        "Semester": 8,
        "Specialization": "Cybersecurity",
        "CGPA": 8.7,
        "Email": "priya.sharma@student.gls.edu.in",
        "Phone": "+91 9876543210",
        "Skills": "Ethical Hacking, Networking, Python, Cryptography",
        "Achievements": "CTF Finalist, Research Paper Published",
        "Tags": "Cybersecurity, Research",
        "Resume URL": "https://drive.google.com/file/d/sample-resume-2/view",
        "Profile Photo": "https://randomuser.me/api/portraits/women/44.jpg",
        "Experience": "SecureNet Solutions",
        "Experience Role": "Security Analyst Intern",
        "Experience Duration": "Jan 2024 - May 2024", 
        "Experience Description": "Conducted vulnerability assessments and penetration testing",
        "Projects": "Network Vulnerability Scanner",
        "Project Description": "Custom tool for automated network security assessment",
        "Project Tech": "Python, Nmap, Scapy",
        "Project Links": "https://github.com/priya/vuln-scanner",
        "Certifications": "Certified Ethical Hacker (CEH)",
        "Certification Issuer": "EC-Council",
        "Certification Year": 2024
      }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(templateData);

    // Auto-size columns
    const colWidths = Object.keys(templateData[0]).map(key => ({
      wch: Math.max(key.length, 15)
    }));
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Return as downloadable file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="student_import_template.xlsx"'
      }
    });

  } catch (error) {
    console.error("❌ Template generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate template" },
      { status: 500 }
    );
  }
}