import React from 'react';

const EducationItem = ({university, degree, gpa, onEdit}) => {
    return (
        <div>
            <p>{university} - {degree} - GPA: {gpa}</p>
            <button onClick={onEdit}>✏️</button>
        </div>
    );
};

export default EducationItem;