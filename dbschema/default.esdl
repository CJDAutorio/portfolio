module default {
    type AboutMeContent {
        required title: str;
        required content: str;
    }
    type Project {
        required name: str;
        required description: str;
        required previewContentBlobUrl: str;
        githubUrl: str;
        websiteUrl: str;
    }
    type ExperienceEntry {
        required title: str;
        required company: str;
        required location: str;
        required startDate: date;
        endDate: date;
        required description: str;
    }
    type EducationEntry {
        required school: str;
        required degree: str;
        required startDate: str;
        endDate: str;
        required description: str;
    }
    type Skill {
        required name: str;
        required level: int;
    }
    type Contact {
        required email: str;
        required linkedin: str;
    }
}
