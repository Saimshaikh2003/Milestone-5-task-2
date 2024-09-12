document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get reference to form elements using their ids
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;

    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("Phone") as HTMLInputElement; // Fixed the ID
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;

    //*** */
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;

    //if check all elements are present
    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      skillsElement
    ) {
      //Get value from form
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      ///  handle picture
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      //Generate the  resume html content
      const resumeOutput = `
        <h2>Resume</h2>
            ${
              profilePictureURL
                ? `<img src="${profilePictureURL}" alt="ProfilePicture" class= "profilePicture"/>`
                : ""
            }

             <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>

            <h3>Education</h3>
            <p>${education}</p>

            <h3>Work Experience</h3>
            <p>${experience}</p>

            <h3>Skills</h3>
            <p>${skills}</p>
        `;
      //** *///*********** */
      //Display the resume in the output container
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");

        //create container for button
        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        resumeOutputElement.appendChild(buttonContainer);

        //Add the download pdf button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          window.print(); //open the print dialog, allowing the user to save as PDF
        });
        buttonContainer.appendChild(downloadButton);

        //Add shareable link
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy shareable Link";
        shareLinkButton.addEventListener("click", async () => {
          try {
            const shareableLink = `http://yourdomain.com/resume/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;

            ///use clipboard Api to use copy the shareable link
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard!");
          } catch (err) {
            console.error("Error copying to clipboard", err);
            alert("Failed to copy link to clipboard. please try again");
          }
        });
        buttonContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Form elements are missing");
    }
  });
