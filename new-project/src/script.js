const revealElements = document.querySelectorAll(".section-reveal");
const counters = document.querySelectorAll("[data-count]");
const stepButtons = document.querySelectorAll(".step");
const workflowNote = document.querySelector("#workflow-note");

const workflowCopy = {
    Analyze: "Read requirements and define what should be tested first.",
    Design: "Create test cases for positive, negative, and boundary scenarios.",
    Execute: "Run checks on UI, API behavior, and automated unit tests.",
    Report: "Write clear bug reports with steps, actual result, and expected result.",
};

function animateCounter(counter) {
    const target = Number(counter.dataset.count);
    let current = 0;
    const duration = 700;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.round(target * progress);
        counter.textContent = String(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");

            entry.target.querySelectorAll("[data-count]").forEach((counter) => {
                if (!counter.dataset.animated) {
                    counter.dataset.animated = "true";
                    animateCounter(counter);
                }
            });
        });
    },
    { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

counters.forEach((counter) => {
    if (!counter.closest(".section-reveal")) {
        animateCounter(counter);
    }
});

stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
        stepButtons.forEach((step) => step.classList.remove("is-active"));
        button.classList.add("is-active");
        workflowNote.textContent = workflowCopy[button.dataset.step];
    });
});
