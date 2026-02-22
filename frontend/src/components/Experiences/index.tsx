import { ExperienceProps } from "./types";

const getMostRecentExperience = (experiences: ExperienceProps[]) => {
  return experiences.reduce((latest, current) => {
    const currentEnd = current.endDate || new Date();
    const latestEnd = latest.endDate || new Date();
    return currentEnd > latestEnd ? current : latest;
  });
};

const formatDate = (date: Date | undefined | null) => {
  if (!date) return "Present";
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const ExperienceBulletPoints = ({ points }: { points: string[] }) => (
  <div className="mt-2">
    {points.map((point, index) => (
      <div key={index} className="flex flex-row gap-2 items-center">
        <div className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="text-[0.85rem] text-gray-500 text-center">{point}</div>
      </div>
    ))}
  </div>
);

const ExperienceRole = ({ experience }: { experience: ExperienceProps }) => (
  <div className="flex flex-col">
    <span className="text-gray-800 flex justify-start">{experience.title}</span>
    <span className="text-gray-500 flex justify-start">
      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
    </span>
    {experience.bulletPoints && (
      <ExperienceBulletPoints points={experience.bulletPoints} />
    )}
  </div>
);

const groupExperiencesByRole = (experiences: ExperienceProps[]) => {
  const grouped = experiences.reduce((acc, experience) => {
    const key = `${experience.title}-${experience.startDate.getTime()}`;
    if (!acc[key]) {
      acc[key] = {
        ...experience,
        bulletPoints: [...(experience.bulletPoints || [])],
      };
    } else {
      // Combine bullet points
      acc[key].bulletPoints = [
        ...(acc[key].bulletPoints || []),
        ...(experience.bulletPoints || []),
      ];

      // Update dates to show the full range
      if (experience.startDate < acc[key].startDate) {
        acc[key].startDate = experience.startDate;
      }
      if (
        !acc[key].endDate ||
        (experience.endDate && experience.endDate > acc[key].endDate)
      ) {
        acc[key].endDate = experience.endDate;
      }
    }
    return acc;
  }, {} as Record<string, ExperienceProps>);

  return Object.values(grouped);
};

export default function Experiences({
  experiences,
  title,
}: {
  experiences: ExperienceProps[];
  title: string;
}) {
  // Group experiences by company
  const groupedExperiences = experiences.reduce((acc, experience) => {
    if (!acc[experience.company]) {
      acc[experience.company] = [];
    }
    acc[experience.company].push(experience);
    return acc;
  }, {} as Record<string, ExperienceProps[]>);

  // Sort companies by their most recent experience
  const sortedCompanies = Object.keys(groupedExperiences).sort((a, b) => {
    const mostRecentA = getMostRecentExperience(groupedExperiences[a]);
    const mostRecentB = getMostRecentExperience(groupedExperiences[b]);

    const endDateA = mostRecentA.endDate || new Date();
    const endDateB = mostRecentB.endDate || new Date();
    return endDateB.getTime() - endDateA.getTime();
  });

  return (
    <>
      <div className="text-gray-500 text-2xl pb-4">{title}</div>
      <div className="flex flex-col gap-2">
        {sortedCompanies.map((company) => (
          <div key={company} className="flex flex-col gap-2">
            <span className="text-gray-800 text-[1.15rem]  font-semibold flex justify-start">
              {company}
            </span>
            <div className="flex flex-col gap-4 pl-4 border-gray-300 ">
              {groupExperiencesByRole(groupedExperiences[company]).map(
                (experience, index) => (
                  <div key={index} className="flex flex-col relative">
                    <ExperienceRole experience={experience} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
