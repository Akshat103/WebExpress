document.addEventListener('DOMContentLoaded', function () {
  updateNavbarVisibility();
});

function checkTokenInCookies() {
  return sessionStorage.getItem("loggedIn");
}

function addForm(formClass, entryClass, removeClass) {
  var formContainers = document.querySelectorAll("." + formClass);
  var lastFormContainer = formContainers[0];
  var form = lastFormContainer.cloneNode(true);

  var removeButton = document.createElement("button");
  removeButton.className = "btn " + removeClass;
  removeButton.setAttribute("type", "button");
  removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  removeButton.onclick = function () {
    this.parentElement.remove();
  };

  form.appendChild(removeButton);

  var inputs = form.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.value = "";
  });

  var formContainer = document.querySelector("." + entryClass);
  formContainer.appendChild(form);
}

function removeForm(formId) {
  var form = document.getElementById(formId);
  form.parentNode.removeChild(form);
}

function addEducation() {
  addForm("education-form", "education-entry", "remove-education");
}

function removeEducationForm() {
  removeForm("education-form");
}

function addExperience() {
  addForm("experience-form", "experience-entry", "remove-experience");
}

function removeExperienceForm() {
  removeForm("experience-form");
}

function addProject() {
  addForm("projects-form", "projects-entry", "remove-project");
}

function removeProjectsForm() {
  removeForm("projects-form");
}

document.addEventListener("DOMContentLoaded", function () {
  const skillsInput = document.getElementById("skillsInput");
  const selectedSkills = document.querySelector(".selected-skills");
  const skillOptions = document.getElementById("skillOptions");
  const skills = [
    "C++", "Javascript", "Java", "Python", "React", "NodeJS", "Express",
    "Flask", "Tensorflow", "Keras", "Hadoop", "MongoDB", "MySQL",
    "Netlify", "GitHub Pages", "Vercel", "Git", "Databricks", "Sqoop", "Hive"
  ];

  function populateSkillOptions(filteredSkills) {
    skillOptions.innerHTML = "";
    filteredSkills.forEach(skill => {
      const option = document.createElement("option");
      option.value = skill;
      skillOptions.appendChild(option);
    });
  }

  function isSkillSelected(skill) {
    const selectedSkills = document.querySelectorAll('.selected-skill');
    for (let i = 0; i < selectedSkills.length; i++) {
      const textContent = selectedSkills[i].textContent.trim();
      const extractedSkill = textContent.split('×')[0].trim();
      if (extractedSkill === skill) {
        return true;
      }
    }
    return false;
  }

  function addSkill(skill) {
    if (!isSkillSelected(skill)) {
      const selectedSkill = document.createElement("span");
      selectedSkill.textContent = skill;
      const removeIcon = document.createElement("span");
      removeIcon.textContent = " ×";
      removeIcon.classList.add("remove-icon");
      selectedSkill.appendChild(removeIcon);
      selectedSkill.classList.add("selected-skill");
      removeIcon.addEventListener("click", () => {
        removeSkill(skill);
      });
      selectedSkills.appendChild(selectedSkill);
      skillsInput.value = "";
      skillOptions.innerHTML = "";
    }
  }

  function removeSkill(skill) {
    const selectedSkills = document.querySelectorAll('.selected-skill');
    selectedSkills.forEach(selectedSkill => {
      if (selectedSkill.textContent.includes(skill)) {
        selectedSkill.remove();
      }
    });
  }

  skillsInput.addEventListener("input", () => {
    const inputValue = skillsInput.value.toLowerCase();
    const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(inputValue));
    populateSkillOptions(filteredSkills);
    if (inputValue === "") {
      skillOptions.innerHTML = "";
    }
  });

  skillsInput.addEventListener("change", () => {
    const selectedSkill = skillsInput.value;
    if (selectedSkill && skills.includes(selectedSkill)) {
      addSkill(selectedSkill);
    }
  });

  skillsInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const newSkill = skillsInput.value.trim();
      if (newSkill !== "") {
        addSkill(newSkill);
      }
    }
  });
});

function getDataFromForm() {
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    profiles: {
      github: document.getElementById("github-url").value.trim(),
      linkedin: document.getElementById("linkedin-url").value.trim(),
      website: document.getElementById("website-url").value.trim()
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  };

  // Retrieve education data
  const educationEntries = document.querySelectorAll(".education-form");
  educationEntries.forEach(entry => {
    const institution = entry.querySelector(".institution").value.trim();
    const year = entry.querySelector(".year").value.trim();
    const degree = entry.querySelector(".degree").value.trim();
    const grade = entry.querySelector(".grade").value.trim();
    formData.education.push({ institution, year, degree, grade });
  });

  // Retrieve experience data
  const experienceEntries = document.querySelectorAll(".experience-form");
  experienceEntries.forEach(entry => {
    const employer = entry.querySelector(".employer").value.trim();
    const year = entry.querySelector(".year").value.trim();
    const position = entry.querySelector(".position").value.trim();
    const description = entry.querySelector(".description").value.trim();
    formData.experience.push({ employer, year, position, description });
  });

  // Retrieve selected skills
  const selectedSkills = document.querySelectorAll(".selected-skill");
  selectedSkills.forEach(skill => {
    formData.skills.push(skill.textContent.trim().split(" ×")[0]);
  });

  // Retrieve project data
  const projectEntries = document.querySelectorAll(".projects-form");
  projectEntries.forEach(entry => {
    const projectName = entry.querySelector(".project-name").value.trim();
    const projectTech = entry.querySelector(".project-tech").value.trim();
    const projectDescription = entry.querySelector(".project-description").value.trim();
    formData.projects.push({ name: projectName, tech: projectTech.split(","), description: projectDescription });
  });

  return formData;

}

function postResumeData() {
  const formData = getDataFromForm();
  console.log(formData);
  axios.post('/resume', formData)
    .then(response => {
      openModal('Registration Successful', response.data.message);
      setTimeout(() => {
        closeModal();
        window.location.href = '/profile';
    }, 3000);
    })
    .catch(error => {
      openModal('Registration Unsuccessful', error.message)
    });
  
  event.preventDefault();
}
