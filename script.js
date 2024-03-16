const typingText = document.querySelector('.typing-test p');
const inputBox = document.querySelector('.input-field');
const time = document.querySelector('.time span b');
const mistake = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('.try');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraphs() {
    const paragraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in magna sit amet massa posuere mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi rutrum auctor risus vel tincidunt.",
        "Whether you’re writing a novel, novella, short story, or flash fiction, don’t be afraid to try out different voices, and styles. Experiment with different story writing techniques, story ideas, and story structures.",
        "Sed fringilla eros sit amet augue consectetur, vel convallis nisi tempor. Quisque placerat justo vel erat ultricies ultricies. Integer quis lobortis odio. Ut placerat erat at sapien rutrum, at tempor dui pharetra.",
        "Proin aliquam lorem vitae elit rhoncus, nec suscipit dui efficitur. Sed dignissim eros nec sapien fringilla, sit amet vehicula lorem finibus. Nam fringilla, dui at dictum eleifend, nisi turpis gravida ex, vitae finibus odio odio at tortor.",
        "Duis mollis justo at nisi rhoncus, non lacinia tortor consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum a dolor et tellus pharetra volutpat non vel odio.",
        "Cras ac urna in nisl interdum faucibus. Quisque auctor turpis at turpis fermentum, vel bibendum ex ultricies. Fusce elementum, libero sed pretium imperdiet, nunc tortor congue sem, vitae viverra risus lorem eget lacus.",
        "Fusce malesuada purus nec ligula feugiat, vitae commodo lorem ullamcorper. Integer aliquet turpis eget tortor ultricies, sed vehicula nisi posuere. Nam feugiat, velit in euismod tristique, ante orci dictum nisl, vitae placerat velit nisl sit amet leo.",
        "Suspendisse potenti. Aenean ac lectus vel sapien scelerisque auctor. Aliquam sit amet urna vitae libero finibus pharetra. Integer condimentum feugiat ligula, ac finibus risus. Suspendisse potenti.",
        "Vivamus vel erat vitae nisi malesuada ultrices. Ut suscipit, lorem in malesuada volutpat, justo purus cursus dui, nec consequat justo enim vitae lorem. Sed eget augue vitae metus vestibulum interdum.",
        "At this stage, it can be helpful to have others read your work. If you belong to a writing group, bring your story to them for constructive feedback. Readers are often better at catching plot holes, mischaracterizations, passages that can be strengthened, and other aspects that just aren’t working than the story’s author because they’re approaching it with fresh eyes.",
        "Maecenas sed nulla nec nisl sollicitudin feugiat. Sed varius purus a fermentum faucibus. Nam hendrerit placerat ante, ac rutrum dui tempus vitae. Morbi eget accumsan justo, non tristique risus. Integer eget sapien sed ex fermentum feugiat.",
        "Once you have an idea for a story, brainstorm. Jot down all the ideas you have, including a rough outline of how the plot will progress. Let yourself play with ideas for characters, settings, plot points, and how the characters will resolve the main conflict (or not!).",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut auctor, justo in ultrices pellentesque, nisi risus consequat elit, vel ultricies tortor purus ut dolor.",
        "Donec hendrerit mauris ut lacus finibus, quis laoreet odio fermentum. Aenean eget quam quis leo mattis efficitur. Nunc sed urna non tortor dapibus faucibus. Phasellus lobortis aliquet turpis, vel euismod ligula laoreet id.",
        "Another famous story is The Thousand and One Nights. This is a collection of stories within a larger story, similar to The Canterbury Tales and The Decameron. The main plot of The Thousand and One Nights is the story of Scheherazade, a young woman who marries the king, delaying her execution by telling him a new story every night.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus scelerisque risus a ligula faucibus, sed fringilla orci malesuada. Etiam vulputate justo ut vehicula vehicula.",
        "Sed lobortis arcu vitae lorem feugiat, id dignissim nisl tempor. Aliquam erat volutpat. Nullam semper ultrices leo id lobortis.",
        "There’s a lot you might infer from this sentence. From the story’s scant clues, you might form ideas about who’s offering the shoes, why they were never worn, and why the seller is seeking payment for them rather than passing them along for free. As you make these inferences, you’re putting together a story.",
        "Nunc sed odio sed dolor posuere interdum. Etiam maximus urna ac tincidunt varius. Fusce nec justo eget urna vestibulum pharetra. Suspendisse eu neque a ex posuere molestie.",
        "Maecenas scelerisque, risus in fermentum volutpat, lectus odio congue augue, sed tristique felis lectus ut est. Duis vel eros nisi. Ut porta quam sit amet nulla dictum, in ultricies mi bibendum.",
        "Who’s the character? The group issuing the cosmic report card. What’s the setting? The cosmos. The plot? Planets receive grades based on their cosmic performance. The conflict? Earth’s failing grade. The theme? Humanity’s unsatisfactory performance.",
        "Vivamus eget est ut felis vehicula tincidunt. In hac habitasse platea dictumst. Integer ut quam vel mi tempor vehicula. Sed pulvinar, mi ut mattis consequat, orci mauris suscipit elit, in fermentum ligula est vel odio.",
        "Morbi bibendum urna at ligula dictum, eget suscipit risus pretium. Phasellus ut condimentum ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;",
        "Location can also provide the inspiration for scenes and can even shape the course of your story. All the research you conducted in the first phase of writing will come in handy during your first draft, when you find yourself needing to describe a particular street, park, or other scene set somewhere previously unfamiliar to you.",
        "A story communicates a theme by telling the reader about a series of events, also known as a narrative. Within the narrative, a character faces at least one conflict, which often (but doesn’t always) change the character.",
        "Sed aliquam bibendum tortor, vitae pharetra risus sagittis nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce gravida eros vel arcu malesuada, sed scelerisque mi malesuada.",
        "You probably know the story of “Goldilocks and the Three Bears.” The version you’re familiar with is a narrative told in the third person. Now imagine reading the story told from Mama Bear’s perspective—the narrative might include a passage like the following.",
        "Donec auctor ante eget dui volutpat ultricies. Sed sed condimentum eros, id dapibus elit. Nam ut neque id justo facilisis laoreet non ut libero.",
        "Far out in the uncharted backwaters of the unfashionable end of the Western Spiral arm of the Galaxy lies a small, unregarded yellow sun.",
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
        "Fusce consequat odio id nisl vestibulum, at laoreet odio pulvinar. Vestibulum id dolor consequat, fermentum sapien vitae, lobortis est. Integer eu augue euismod, vehicula justo eget, fermentum eros."
    ];

    const randomIdx = Math.floor(Math.random() * paragraphs.length);
    // console.log(randomIdx);
    // console.log(paragraphs[randomIdx]);

    typingText.innerHTML = "";
    for (const char of paragraphs[randomIdx]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => {
        inputBox.focus();
    });
    typingText.addEventListener("click", () => {
        inputBox.focus();
    });
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = inputBox.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log("correct");
        } else {
            mistakes++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistake.innerHTML = mistakes;
        cpm.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpm_cnt = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpm_cnt;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraphs();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
}

inputBox.addEventListener("input", initTyping);

btn.addEventListener("click", reset);
loadParagraphs();