import EducationItem from "./EducationItem";
import {useState} from "react";

const Resume = () => {
    const [education, setEducation] = useState([
        {id: 1, university: 'Yasar University', degree: 'Software Engineering', gpa: 2.87},
        {id: 2, university: 'Yale University', degree: 'Computer Engineering', gpa: 2.50},
    ]);

    const handleEditEducation = (id) => {
        // Bu fonksiyon, kullanıcı tarafından düzenleme yapılmasını sağlar.
        // Örneğin, bir modal açabilir ve kullanıcıdan yeni bilgiler alabilirsiniz.
        console.log(`Editing education with id: ${id}`);
        // Burada yeni bilgileri state'e kaydetmek için setEducation kullanılmalı.
    };

    return (
        <div>
            <h2>About Me:</h2>
            <p>I am final year Software Engineering student. I am interested in Backend and Android development</p>
            <h2>Education</h2>
            {education.map(edu => (
                <EducationItem
                    key={edu.id}
                    university={edu.university}
                    degree={edu.degree}
                    gpa={edu.gpa}
                    onEdit={() => handleEditEducation(edu.id)}
                />
            ))}
            {/* Burada kurslar, projeler ve deneyimler için benzer bileşenler eklenebilir. */}
        </div>
    );
};

export default Resume;