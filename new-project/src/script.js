const revealElements = document.querySelectorAll(".section-reveal");
const counters = document.querySelectorAll("[data-count]");
const stepButtons = document.querySelectorAll(".step");
const workflowNote = document.querySelector("#workflow-note");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const areaSections = document.querySelectorAll("[data-area]");
const generateCaseButton = document.querySelector("#generate-case");
const featureInput = document.querySelector("#feature-input");
const caseOutput = document.querySelector("#case-output");
const addBugButton = document.querySelector("#add-bug");
const bugInput = document.querySelector("#bug-input");
const bugList = document.querySelector("#bug-list");
const checklistItems = document.querySelectorAll(".check-row input");
const progressBar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");

const workflowCopy = {
    analysis: "Изучить требования и понять, что нужно проверить в первую очередь.",
    design: "Подготовить позитивные, негативные и граничные тестовые сценарии.",
    execute: "Запустить проверки интерфейса, API-логики и автоматические тесты.",
    report: "Описать дефект: шаги, фактический результат, ожидаемый результат и окружение.",
};

const testIdeas = [
    {
        title: "Позитивный сценарий",
        steps: "Открыть экран, заполнить валидные данные, нажать основную кнопку.",
        expected: "Система выполняет действие и показывает понятный успешный результат.",
    },
    {
        title: "Негативный сценарий",
        steps: "Оставить обязательные поля пустыми и попытаться продолжить.",
        expected: "Система показывает сообщение об ошибке и не отправляет некорректные данные.",
    },
    {
        title: "Граничное значение",
        steps: "Ввести минимально и максимально допустимые значения.",
        expected: "Система корректно принимает допустимые значения и отклоняет лишние.",
    },
    {
        title: "Проверка доступности",
        steps: "Перейти по элементам с клавиатуры и проверить видимый фокус.",
        expected: "Все важные элементы доступны без мыши и имеют понятный порядок фокуса.",
    },
];

function animateCounter(counter) {
    const target = Number(counter.dataset.count);
    const duration = 700;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = String(Math.round(target * progress));

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

function updateProgress() {
    const checkedCount = [...checklistItems].filter((item) => item.checked).length;
    const percent = Math.round((checkedCount / checklistItems.length) * 100);

    progressBar.style.width = `${percent}%`;
    progressLabel.textContent = `${percent}% готово`;
}

function createTestCase() {
    const feature = featureInput.value.trim() || "Новый экран";
    const idea = testIdeas[Math.floor(Math.random() * testIdeas.length)];

    caseOutput.innerHTML = `
        <strong>${idea.title}: ${feature}</strong><br>
        <span>Шаги: ${idea.steps}</span><br>
        <span>Ожидаемый результат: ${idea.expected}</span>
    `;
}

function addBug() {
    const text = bugInput.value.trim();

    if (!text) {
        bugInput.focus();
        return;
    }

    const priority = ["High", "Medium", "Low"][Math.floor(Math.random() * 3)];
    const priorityClass = priority.toLowerCase();
    const item = document.createElement("li");

    item.innerHTML = `<span class="priority ${priorityClass}">${priority}</span> ${text}`;
    bugList.prepend(item);
    bugInput.value = "";
}

revealElements.forEach((element) => observer.observe(element));

stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
        stepButtons.forEach((step) => step.classList.remove("is-active"));
        button.classList.add("is-active");
        workflowNote.textContent = workflowCopy[button.dataset.step];
    });
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeToggle.querySelector("span").textContent = document.body.classList.contains("dark-theme")
        ? "Светлая тема"
        : "Темная тема";
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        areaSections.forEach((section) => {
            section.classList.toggle(
                "is-filtered-out",
                filter !== "all" && section.dataset.area !== filter
            );
        });
    });
});

generateCaseButton.addEventListener("click", createTestCase);
addBugButton.addEventListener("click", addBug);
bugInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBug();
    }
});

checklistItems.forEach((item) => item.addEventListener("change", updateProgress));
updateProgress();
