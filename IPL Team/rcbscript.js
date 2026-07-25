const themeBtn = document.getElementById("themeBtn");
const topBtn = document.getElementById("topBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function vote(player) {
    document.getElementById("voteResult").innerHTML =
        `🏏 Thanks for voting! Your favourite player is <b>${player}</b> ❤️`;
}

const counters = document.querySelectorAll("[data-target]");

let started = false;

function startCounter() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;
        const increment = Math.max(1, Math.ceil(target / 100));

        const update = () => {
            count += increment;

            if (count < target) {
                counter.textContent = count;
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };

        update();
    });
}

const stats = document.querySelector(".stats");

if (stats) {
    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounter();
            counterObserver.disconnect();
        }
    });

    counterObserver.observe(stats);
}

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("🎉 Thank you for joining the RCB Fan Club!");
        form.reset();
    });
}

const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease";
    revealObserver.observe(section);
});