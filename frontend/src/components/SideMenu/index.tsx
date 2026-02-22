import { SideMenuProps } from "./types";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import gmail from "../../assets/gmail.png";

const SideMenu = ({
  education,
  skillCategories,
  languages,
  socialMedia,
}: SideMenuProps) => {
  return (
    <div className="flex flex-col w-1/4 min-h-screen bg-gray-100 p-6 border-r border-gray-200 gap-5">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col">
          {socialMedia.map((media, index) => (
            <div
              className="flex flex-row gap-2 text-gray-700 text-justify"
              key={index}
            >
              {media.icon === "iconGithub" && (
                <img src={github} alt={media.label} className="w-6 h-6" />
              )}
              {media.icon === "iconEmail" && (
                <img src={gmail} alt={media.label} className="w-6 h-6" />
              )}
              {media.icon === "iconLinkedin" && (
                <img src={linkedin} alt={media.label} className="w-6 h-6" />
              )}
              <a href={media.url} target="_blank">
                {media.label}
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold  text-gray-700 text-justify">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-semibold text-xl text-gray-700 text-justify">
                {edu.school}:
              </h3>
              <p className="text-gray-600 text-justify">
                {edu.degree} - {edu.period}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold  text-gray-700 text-justify">
          Skills
        </h2>
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="font-semibold text-xl text-gray-700  text-justify">
              {category.name}:{" "}
            </h3>
            <p className="text-gray-600 text-justify">
              {category.skills.map((skill) => skill.name).join(", ")}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-bold text-gray-700 text-justify">Languages</h2>
        {languages.map((lang, index) => (
          <div key={index} className="text-justify">
            <span className="text-gray-600 text-justify">
              {lang.name} - {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
