const lights = [
  { id: "red", duration: 2000 },
  { id: "yellow", duration: 1000 },
  { id: "green", duration: 2000 },
];

let current = 0;

function cycleLights() {
  lights.forEach((light, index) => {
    document.getElementById(light.id).classList.remove("active");
  });

  const { id, duration } = lights[current];
  document.getElementById(id).classList.add("active");

  current = (current + 1) % lights.length;
  setTimeout(cycleLights, duration);
}

cycleLights(); // Start animation

// Optional: Typing effect
const text = "Mohon bersabar, kami sedang memperbaiki lalu lintas data...";
const typingTarget = document.getElementById("typing-text");
let i = 0;
typingTarget.textContent = "";

function typeEffect() {
  if (i < text.length) {
    typingTarget.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 40);
  }
}

typeEffect();
