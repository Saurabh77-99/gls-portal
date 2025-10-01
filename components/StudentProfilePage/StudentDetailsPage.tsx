"use client"

import Button from "@/components/ui/Button"
import type React from "react"
import ProfileSection from "./ProfileSection"
import DetailsCard from "./DetailsCard"
import { Badge, SkillBadges } from "../ui/Badge"

const StudentDetailsPage = ({ currentStudent }: any) => {

  console.log("Current student", currentStudent)

  return (
    <div className=" w-full bg-neutral-100 p-4 flex items-center justify-center">
      <div className="w-full mx-auto bg-neutral-100 border-2 border-neutral-200 rounded-4xl overflow-hidden ">
        <div className="flex p-8 gap-12 items-start">
          {/* Left Sidebar */}
          <div className="w-[486px] border-b border-neutral-200  bg-neutral-50/50">
            {/* Profile Section */}
            <ProfileSection
              name={currentStudent?.name}
              batch={currentStudent?.batch}
              branch={currentStudent?.branch}
              profilePhoto={currentStudent?.profilePhoto}
              specialization={currentStudent?.specialization}
              semester={currentStudent?.semester}
              socialLinks={currentStudent?.socialLinks}
            />

            <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
            {/* tags */}

            <SkillBadges skills={currentStudent?.tags}/>

            <div className="border-b-[1.5px] border-neutral-200 my-6"></div>

            {/* Top Skills */}

            {
              currentStudent?.skills?.length > 0 &&
              <div className="flex flex-col gap-4">
                <h3 className="text-[16px] font-normal text-neutral-500 uppercase tracking-wide leading-[22.5px]">TOP SKILLS</h3>
                <div className="flex flex-wrap gap-2">
                  {currentStudent?.skills?.map((skill, index) =>
                    <Badge variant="outline" key={index}>{skill}</Badge>
                  )}
                </div>

              </div>
            }


            <div className="border-b-[1.5px] border-neutral-200 my-6"></div>

            {/* Grades */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] font-normal text-neutral-500 uppercase tracking-wide leading-[22.5px]">GRADES</h3>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-semibold text-gray-800">CGPA:</span> <span className="text-gray-600">{currentStudent?.cgpa}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-800">Previous Sem:</span> <span className="text-gray-600">{currentStudent?.previousSemesterCgpa}</span>
                </div>
              </div>
            </div>


            {/* Contact */}
            <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] font-normal text-neutral-500 uppercase tracking-wide leading-[22.5px]">CONTACT</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  <a href={`mailto:${currentStudent?.email}`} className="text-neutral-700 hover:underline">{currentStudent?.contact?.email}</a>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Phone:</span> <span className="text-gray-600">{currentStudent?.contact?.phone}</span>
                </div>
              </div>
            </div>


            {/* Languages */}
            {
                currentStudent?.languagesKnown?.length > 0 &&
                  <div>
                    <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[16px] font-normal text-neutral-500 uppercase tracking-wide leading-[22.5px]">LANGUAGES KNOWN</h3>
                    <div className="flex flex-wrap gap-2">
                       {currentStudent?.languagesKnown?.map((language, index) =>
                    <Badge variant="outline" key={index}>{language}</Badge>
                  )}
                    </div>
                  </div>
                  </div>
                }

            {
            currentStudent?.preferences && (
              currentStudent.preferences.industries?.length > 0 ||
              currentStudent.preferences.jobType?.length > 0 ||
              currentStudent.preferences.location?.length > 0 ||
              currentStudent.preferences.role?.length > 0
            ) &&
            <div>
            <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] font-normal text-neutral-500 uppercase tracking-wide leading-[22.5px]">PREFERENCES</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...(currentStudent.preferences.industries || []),
                  ...(currentStudent.preferences.jobType || []),
                  ...(currentStudent.preferences.location || []),
                  ...(currentStudent.preferences.role || [])
                ].map((preference, index) => (
                  <Badge variant="outline" key={`preference-${index}`}>{preference}</Badge>
                ))}
              </div>
            </div>
            </div>
          }
          </div>

          {/* Right Content */}
          {/* FIX 2: Removed mb-6 from section containers and used my-6 on separators for consistent spacing */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-6">
              <div>
                <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">Overview</h2>
                <p className=" text-[16px] text-neutral-600 font-medium">
                  {currentStudent?.overview} 
                </p>
              </div>
              <Button variant="filled" size="medium">
                📄 Download Resume
              </Button>
            </div>

            {/* <div className="border-b-[1.5px] border-neutral-200 my-6"></div> */}

            {/* Experience */}
            {
              currentStudent?.experience?.length > 0 && 
              <div>
                <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
              <div>
              <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">Experience</h2>
              {
                currentStudent?.experience?.map((exp,ind)=>
                <DetailsCard
                key={ind}
                type="experiance"
                title={exp?.company}
                duration={exp?.duration || null}
                description={exp?.description || null}
                certificateLink={exp?.certificateLink || null}
                role={exp?.role}
                />
                )
              }
            </div>
              </div>
            }


            {/* Projects */}

            {currentStudent?.projects?.length > 0 &&
              <div>
                <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
             <div>
              <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">Projects</h2>
              {
                currentStudent?.projects?.map((project,ind)=>
                <DetailsCard
                key={ind}
                type="projects"
                title={project?.title}
                description={project?.description || null}
                certificateLink={project?.certificateLink || null}
                techStack={project?.techStack || null}
                />
                )
              }
            </div>
              </div>
            }


            {/* Research/Publications */}

            {currentStudent?.researchPublications?.length > 0 &&
              <div>
                <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
             <div>
              <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">Research/Publications</h2>
              {
                currentStudent?.researchPublications?.map((researchPublication,ind)=>
                <DetailsCard
                key={ind}
                type="research"
                title={researchPublication?.title}
                certificateLink={researchPublication?.paperUrl || null}
                duration={researchPublication?.journal}
                />
                )
              }
            </div>
              </div>
            }


            {/* Achievements */}

            {currentStudent?.achievements?.length > 0 &&
              <div>
                <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
             <div>
              <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">ACHIEVEMENTS</h2>
              {
                currentStudent?.achievements?.map((achievement,ind)=>
                <DetailsCard
                key={ind}
                type="research"
                title={achievement?.title}
                description={achievement.description}
                />
                )
              }
            </div>
              </div>
            }


            {/* Certifications */}
            {currentStudent?.certifications?.length > 0 &&
              <div>
                  <div className="border-b-[1.5px] border-neutral-200 my-6"></div>
             <div>
              <h2 className="text-[24px] text-neutral-900 font-semibold leading-8">Certifications</h2>
              {
                currentStudent?.certifications?.map((certificate,ind)=>
                <DetailsCard
                key={ind}
                type="certifications"
                title={certificate?.name}
                certificateLink={certificate?.certificateLink || null}
                issuer={certificate?.issuer}
                issueYear={certificate.year}
                />
                )
              }
            </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailsPage

