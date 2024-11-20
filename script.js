document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
  
    const storySteps = {
      start: {
        text: "Você se encontra em um labirinto misterioso. Para onde deseja ir?",
        options: [
          { text: "Seguir pelo corredor da esquerda", next: "left" },
          { text: "Seguir pelo corredor da direita", next: "right" },
        ],
      },
      left: {
        text: "Você encontra uma porta trancada. O que fazer?",
        options: [
          { text: "Voltar ao início", next: "start" },
          { text: "Tentar abrir a porta", next: "door" },
        ],
      },
      right: {
        text: "Você encontra um enigma escrito na parede. O que fazer?",
        options: [
          { text: "Responder o enigma", next: "riddle" },
          { text: "Voltar ao início", next: "start" },
        ],
      },
      door: {
        text: "A porta se abre para revelar uma sala brilhante. Você venceu o desafio!",
        options: [],
      },
      riddle: {
        text: "Você resolve o enigma e encontra um caminho para a liberdade. Parabéns!",
        options: [],
      },
    };
  
    function renderStep(stepId) {
      const step = storySteps[stepId];
      if (!step) return;
  
        localStorage.setItem("lastStep", stepId);
  
      content.innerHTML = `<p>${step.text}</p>`;
      step.options.forEach((option) => {
        const link = document.createElement("a");
        link.href = `?step=${option.next}`;
        link.textContent = option.text;
        link.style.display = "block";
        link.addEventListener("click", (e) => {
          e.preventDefault();
          renderStep(option.next);
        });
        content.appendChild(link);
      });
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const currentStep = urlParams.get("step") || localStorage.getItem("lastStep") || "start";
    renderStep(currentStep);
  });
  