// Shorthand event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  updateNavbarVisibility();
  formFormat();
});

const handleFormSubmission = (url, successMessage, successCallback) => {
  return e => {
    e.preventDefault();
    const formData = getDataFromForm();
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        openModal('Success', successMessage || response.data.message);
        setTimeout(() => {
          closeModal();
          if (successCallback) successCallback();
        }, 2000);
      })
      .catch(error => {
        openModal('Error', error.message);
      });
  };
};

// Form submission handlers
const submitStarterForm = handleFormSubmission('/api/add-resume', 'Registration Successful', () => {
  window.location.href = '/profile';
});

const submitUpdateForm = handleFormSubmission('/api/update-details', 'Details Updated Successfully', () => {
  window.location.href = '/profile';
});

// Attach event listeners
const getStartedForm = document.getElementById('profileForm');
const updateForm = document.getElementById('updateResumeForm');

if (getStartedForm) {
  getStartedForm.addEventListener('submit', submitStarterForm);
}

if (updateForm) {
  updateForm.addEventListener('submit', submitUpdateForm);
}

// Reusable function to add forms
const addForm = (formClass, entryClass, removeClass, inputs) => {
  const formContainers = document.querySelectorAll(`.${formClass}`);
  const lastFormContainer = formContainers[0];
  const form = lastFormContainer.cloneNode(true);

  const removeButton = document.createElement('button');
  removeButton.className = `btn ${removeClass}`;
  removeButton.setAttribute('type', 'button');
  removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  removeButton.onclick = () => removeButton.parentElement.remove();

  form.appendChild(removeButton);

  const formInputs = form.querySelectorAll(inputs);
  formInputs.forEach(input => input.value = '');

  document.querySelector(`.${entryClass}`).appendChild(form);
};

// Function to remove forms
const removeForm = formId => {
  const form = document.getElementById(formId);
  form.parentNode.removeChild(form);
};

// Event handlers for adding/removing forms
const addEducation = () => addForm('education-form', 'education-entry', 'remove-education', '.institution, .year, .degree, .grade');
const removeEducationForm = () => removeForm('education-form');
const addExperience = () => addForm('experience-form', 'experience-entry', 'remove-experience', '.employer, .year, .position, .description');
const removeExperienceForm = () => removeForm('experience-form');
const addProject = () => addForm('projects-form', 'projects-entry', 'remove-project', '.project-name, .project-tech, .project-description');
const removeProjectsForm = () => removeForm('projects-form');

// Skill management functions
const skillsInput = document.getElementById('skillsInput');
const selectedSkills = document.querySelector('.selected-skills');
const skillOptions = document.getElementById('skillOptions');
const skills = [
  'C++', 'Javascript', 'Java', 'Python', 'React', 'NodeJS', 'Express',
  'Flask', 'Tensorflow', 'Keras', 'Hadoop', 'MongoDB', 'MySQL',
  'Netlify', 'GitHub Pages', 'Vercel', 'Git', 'Databricks', 'Sqoop', 'Hive',
];

const populateSkillOptions = filteredSkills => {
  skillOptions.innerHTML = '';
  filteredSkills.forEach(skill => {
    const option = document.createElement('option');
    option.value = skill;
    skillOptions.appendChild(option);
  });
};

const isSkillSelected = skill => {
  const selectedSkills = document.querySelectorAll('.selected-skill');
  return [...selectedSkills].some(s => s.textContent.trim().split('×')[0].trim() === skill);
};

const addSkill = skill => {
  if (!isSkillSelected(skill)) {
    const selectedSkill = document.createElement('span');
    selectedSkill.textContent = skill;
    selectedSkill.classList.add('selected-skill');
    selectedSkills.appendChild(selectedSkill);
    skillsInput.value = '';
    skillOptions.innerHTML = '';
    selectedSkill.addEventListener('click', () => {
      selectedSkill.remove();
    });
  }
};

document.querySelector('.selected-skills').addEventListener('click', event => {
  if (event.target.classList.contains('selected-skill')) {
    event.target.remove();
  }
});

skillsInput.addEventListener('input', () => {
  const inputValue = skillsInput.value.toLowerCase();
  const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(inputValue));
  populateSkillOptions(filteredSkills);
  if (inputValue === '') skillOptions.innerHTML = '';
});

skillsInput.addEventListener('change', () => {
  const selectedSkill = skillsInput.value;
  if (selectedSkill && skills.includes(selectedSkill)) addSkill(selectedSkill);
});

skillsInput.addEventListener('keydown', event => {
  if (event.key === ' ' && !event.repeat) {
    const newSkill = skillsInput.value.trim();
    if (newSkill !== '') addSkill(newSkill);
  }
});

// Image and resume name display
const showImageName = () => {
  const input = document.getElementById('profile');
  const imageNameElement = document.getElementById('image-name');
  imageNameElement.textContent = input.files.length > 0 ? `Uploaded: ${input.files[0].name}` : '';
};

const showResumeName = () => {
  const fileInput = document.getElementById('resume');
  const resumeNameElement = document.getElementById('resume-name');
  resumeNameElement.textContent = fileInput.files[0].name;
};

const getDataFromForm = () => {
  const formData = new FormData();

  formData.append('name', document.getElementById('name').value.trim());
  formData.append('title', document.getElementById('title').value.trim());
  formData.append('about', document.getElementById('about').value.trim());
  formData.append('email', document.getElementById('email').value.trim());
  formData.append('phone', document.getElementById('phone').value.trim());
  formData.append('profiles[github]', document.getElementById('github-url').value.trim());
  formData.append('profiles[linkedin]', document.getElementById('linkedin-url').value.trim());
  formData.append('profiles[website]', document.getElementById('website-url').value.trim());

  const profileImage = document.getElementById('profile').files[0];
  if (profileImage) formData.append('profileImage', profileImage);

  const resume = document.getElementById('resume').files[0];
  if (resume) formData.append('resume', resume);

  document.querySelectorAll('.education-form').forEach((entry, index) => {
    formData.append(`education[${index}][institution]`, entry.querySelector('.institution').value.trim());
    formData.append(`education[${index}][year]`, entry.querySelector('.year').value.trim());
    formData.append(`education[${index}][degree]`, entry.querySelector('.degree').value.trim());
    formData.append(`education[${index}][grade]`, entry.querySelector('.grade').value.trim());
  });

  document.querySelectorAll('.experience-form').forEach((entry, index) => {
    formData.append(`experience[${index}][employer]`, entry.querySelector('.employer').value.trim());
    formData.append(`experience[${index}][year]`, entry.querySelector('.year').value.trim());
    formData.append(`experience[${index}][position]`, entry.querySelector('.position').value.trim());
    formData.append(`experience[${index}][description]`, entry.querySelector('.description').value.trim());
  });

  document.querySelectorAll('.selected-skill').forEach((skill, index) => {
    const skillText = skill.textContent.trim().replace(/×$/, '');
    formData.append(`skills[${index}]`, skillText);
  });

  document.querySelectorAll('.projects-form').forEach((entry, index) => {
    formData.append(`projects[${index}][name]`, entry.querySelector('.project-name').value.trim());
    formData.append(`projects[${index}][tech]`, entry.querySelector('.project-tech').value.trim());
    formData.append(`projects[${index}][description]`, entry.querySelector('.project-description').value.trim());
  });

  return formData;
};

const formFormat = () => {
  const githubInput = document.getElementById('github-url');
  const linkedinInput = document.getElementById('linkedin-url');

  const githubRegex = /^https:\/\/github\.com\/[\w\.-]+(\/[\w\.-]+)*$/;
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;

  githubInput.addEventListener('blur', function () {
    validateInput(githubInput, githubRegex);
  });

  linkedinInput.addEventListener('blur', function () {
    validateInput(linkedinInput, linkedinRegex);
  });

  function validateInput(input, regex) {
    const value = input.value.trim();
    const isValid = regex.test(value);
    const errorSpan = input.nextElementSibling;

    if (!isValid) {
      errorSpan.style.display = 'block';
      input.classList.add('invalid');
    } else {
      errorSpan.style.display = 'none';
      input.classList.remove('invalid');
    }
  }

  const yearInputs = document.querySelectorAll('.year');

  yearInputs.forEach(input => {
    input.addEventListener('input', function () {
      const currentYear = new Date().getFullYear() + 1;
      if (parseInt(this.value) > currentYear) {
        this.value = currentYear;
      }
    });
  });

  const inputs = document.querySelectorAll('.input');
  const inputsSentences = document.querySelectorAll('.input-sentence');

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      this.value = toUpper(this.value);
    });
  });

  inputsSentences.forEach(input => {
    input.addEventListener('input', function () {
      this.value = toSentenceCase(this.value);
    });
  });
}

function toUpper(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^|\.\s+|\?\s+|\!\s+)([a-z])/g, function (match, p1, p2) {
    return p1 + p2.toUpperCase();
  });
}
