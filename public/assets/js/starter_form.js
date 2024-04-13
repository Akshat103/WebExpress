document.addEventListener('DOMContentLoaded', function () {
  updateNavbarVisibility();
});

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

function showImageName() {
  const input = document.getElementById('profile');
  const imageNameElement = document.getElementById('image-name');

  if (input.files.length > 0) {
    const imageName = input.files[0].name;
    imageNameElement.textContent = `Uploaded: ${imageName}`;
  } else {
    imageNameElement.textContent = '';
  }
}

function showResumeName() {
  const fileInput = document.getElementById('resume');
  const fileName = fileInput.files[0].name;
  const resumeNameElement = document.getElementById('resume-name');
  resumeNameElement.textContent = fileName;
}

const form = document.getElementById("profileForm");

form.addEventListener("submit", submitForm);

function getDataFromForm() {
  const formData = new FormData();

  // Append form fields to FormData object
  formData.append("name", document.getElementById("name").value.trim());
  formData.append("title", document.getElementById("title").value.trim());
  formData.append("about", document.getElementById("about").value.trim());
  formData.append("email", document.getElementById("email").value.trim());
  formData.append("phone", document.getElementById("phone").value.trim());
  formData.append("profiles[github]", document.getElementById("github-url").value.trim());
  formData.append("profiles[linkedin]", document.getElementById("linkedin-url").value.trim());
  formData.append("profiles[website]", document.getElementById("website-url").value.trim());

  // Append uploaded profile image
  const profileImage = document.getElementById("profile").files[0];
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  // Append uploaded resume
  const resume = document.getElementById("resume").files[0];
  if (resume) {
    formData.append("resume", resume);
  }

  // Append education data
  const educationEntries = document.querySelectorAll(".education-form");
  educationEntries.forEach((entry, index) => {
    formData.append(`education[${index}][institution]`, entry.querySelector(".institution").value.trim());
    formData.append(`education[${index}][year]`, entry.querySelector(".year").value.trim());
    formData.append(`education[${index}][degree]`, entry.querySelector(".degree").value.trim());
    formData.append(`education[${index}][grade]`, entry.querySelector(".grade").value.trim());
  });

  // Append experience data
  const experienceEntries = document.querySelectorAll(".experience-form");
  experienceEntries.forEach((entry, index) => {
    formData.append(`experience[${index}][employer]`, entry.querySelector(".employer").value.trim());
    formData.append(`experience[${index}][year]`, entry.querySelector(".year").value.trim());
    formData.append(`experience[${index}][position]`, entry.querySelector(".position").value.trim());
    formData.append(`experience[${index}][description]`, entry.querySelector(".description").value.trim());
  });

  // Append selected skills
  const selectedSkills = document.querySelectorAll(".selected-skill");
  selectedSkills.forEach((skill, index) => {
    formData.append(`skills[${index}]`, skill.textContent.trim().split(" x")[0]);
  });

  // Append project data
  const projectEntries = document.querySelectorAll(".projects-form");
  projectEntries.forEach((entry, index) => {
    formData.append(`projects[${index}][name]`, entry.querySelector(".project-name").value.trim());
    formData.append(`projects[${index}][tech]`, entry.querySelector(".project-tech").value.trim());
    formData.append(`projects[${index}][description]`, entry.querySelector(".project-description").value.trim());
  });

  return formData;
}

function submitForm(e) {
  e.preventDefault();
  // showLoading();

  const formData = getDataFromForm();

  axios.post('/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      // hideLoading();
      openModal('Registration Successful', response.data.message);
      setTimeout(() => {
        closeModal();
        window.location.href = '/profile';
      }, 3000);
    })
    .catch(error => {
      // hideLoading();
      openModal('Registration Unsuccessful', error.message)
    });
}