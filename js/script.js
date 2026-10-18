const checklist = document.querySelector("#habit-checklist");
const habitCheckboxes = checklist
  ? Array.from(checklist.querySelectorAll('input[name="habit"]'))
  : [];
const progressCount = document.querySelector("#progress-count");
const progressPercent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector("#progress-track");
const progressAnnouncement = document.querySelector("#progress-announcement");

function updateProgress() {
  const completed = habitCheckboxes.filter((checkbox) => checkbox.checked).length;
  const total = habitCheckboxes.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const progressText = `${completed} of ${total} habits complete`;

  if (progressCount) progressCount.value = String(completed);
  if (progressPercent) progressPercent.value = `${percentage}%`;
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressTrack) {
    progressTrack.setAttribute("aria-valuemax", String(total));
    progressTrack.setAttribute("aria-valuenow", String(completed));
    progressTrack.setAttribute("aria-valuetext", progressText);
  }
  if (progressAnnouncement) progressAnnouncement.textContent = `${progressText}.`;
}

if (checklist) {
  checklist.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement && event.target.name === "habit") {
      updateProgress();
    }
  });

  checklist.addEventListener("reset", () => {
    window.requestAnimationFrame(updateProgress);
  });
}

updateProgress();

const plannerForm = document.querySelector("#planner-form");
const wellnessGoal = document.querySelector("#wellness-goal");
const plannerResults = document.querySelector("#planner-results");

const wellnessPlans = {
  "better-rest": {
    title: "Better Rest",
    activities: [
      {
        activity: "Establish a relaxing bedtime routine.",
        description: "Set aside time for a calm activity before going to sleep."
      },
      {
        activity: "Make your wind-down time screen-light.",
        description: "Try putting devices aside for a while and choosing a quiet activity instead."
      }
    ]
  },
  "more-movement": {
    title: "More Movement",
    activities: [
      {
        activity: "Take a movement break.",
        description: "Choose a convenient time to stand, stretch, or walk for a few minutes."
      },
      {
        activity: "Add movement to something you already do.",
        description: "If it suits your day, take a short walk while heading to class or meeting a friend."
      }
    ]
  },
  hydration: {
    title: "Hydration",
    activities: [
      {
        activity: "Keep a drink within reach.",
        description: "Having water nearby can remind you to drink throughout the day according to your needs."
      },
      {
        activity: "Pair a drink with a daily routine.",
        description: "Take a moment for water when you sit down to study or pause between activities."
      }
    ]
  },
  "stress-management": {
    title: "Stress Management",
    activities: [
      {
        activity: "Pause for a few comfortable breaths.",
        description: "Take a brief pause between tasks and focus on breathing at a pace that feels comfortable."
      },
      {
        activity: "Break a big task into a first step.",
        description: "Write down one small next action, then give yourself time to work on just that."
      }
    ]
  },
  "healthy-daily-routine": {
    title: "Healthy Daily Routine",
    activities: [
      {
        activity: "Choose one steady start to your day.",
        description: "Pick a simple first step that works for you, such as getting ready or having breakfast."
      },
      {
        activity: "Make space for a pause in your schedule.",
        description: "Choose a natural break between activities to rest, hydrate, or check in with yourself."
      }
    ]
  }
};

if (plannerForm && wellnessGoal && plannerResults) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedPlan = wellnessPlans[wellnessGoal.value];

    if (!selectedPlan) {
      const message = document.createElement("p");
      message.className = "planner-message";
      message.textContent = "Choose a wellness goal first, and we'll find a few ideas for you.";
      plannerResults.replaceChildren(message);
      wellnessGoal.focus();
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent = `A few ideas for ${selectedPlan.title}`;

    const activityList = document.createElement("div");
    activityList.className = "planner-activity-list";

    selectedPlan.activities.forEach(({ activity, description }) => {
      const card = document.createElement("article");
      card.className = "planner-activity";

      const activityHeading = document.createElement("h4");
      activityHeading.textContent = activity;

      const activityDescription = document.createElement("p");
      activityDescription.textContent = description;

      card.append(activityHeading, activityDescription);
      activityList.append(card);
    });

    plannerResults.replaceChildren(heading, activityList);
  });
}
