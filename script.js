let userSelections = [];
const quizData =
[
    {
        question: "1. What does HTML stands for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hypertext Machine Language",
        d: "Hypertext Markup Link",
        correct: "a",
    },
    {
        question: "2. Which of the following is used to declare a variable in Javascript?",
        a: "var",
        b: "let",
        c: "set",
        d: "const",
        correct: "b",
    },
    {
        question: "3. Which of the following is responsible for displaying a webpage in a browser?",
        a: "XML",
        b: "CSS",
        c: "HTML",
        d: "JavaScript",
        correct: "c",
    },
    {
        question: "4. What does CSS stands for?",
        a: "Central Styling System",
        b: "Cascading Sheets Styles",
        c: "Cascading Simple Sheets",
        d: "Cascading Style Sheets",
        correct: "d",
    },
    {
        question: "5. What is the correct syntax for adding a comment in CSS?",
        a: "! Comment",
        b: "/* Comment */",
        c: "// Comment //",
        d: "# Comment #",
        correct: "b",
    },
    {
        question: "6. How do you select an element with ID 'header' in CSS?",
        a: "//header",
        b: "header",
        c: "#header",
        d: "*header",
        correct: "c",
    },
    {
        question: "7. Which year was JavaScript launched?",
        a: "1995",
        b: "1996",
        c: "1994",
        d: "None of the above",
        correct: "a",
    },
    {
        question: "8. Which language is most commonly used?",
        a: "HTML",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "9. Which language runs in a web browser?",
        a: "HTML",
        b: "CSS",
        c: "Javascript",
        d: "Python",
        correct: "c",
    },
    {
        question: "10. Which method is used to write content into an HTML document?",
        a: "console.log()",
        b: "document.write()",
        c: "window.alert()",
        d: "document.log()",
        correct: "b",
    }
];
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answersEls = document.querySelectorAll('.answer');
const timerEl = document.getElementById('time');
const progressEl = document.createElement('div');
progressEl.className = 'progress';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressEl.appendChild(progressBar);
document.querySelector('.quiz-container').insertBefore(progressEl, questionEl);
let currentQuiz = 0;
let score = 0;
let timer;
function loadQuiz()
{
    deselectAnswers();
    const qData = quizData[currentQuiz];
    questionEl.innerHTML = qData.question;
    a_text.innerText = qData.a;
    b_text.innerText = qData.b;
    c_text.innerText = qData.c;
    d_text.innerText = qData.d;
    const progressWidth = ((currentQuiz + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressWidth}%`;
    startTimer();
}
function deselectAnswers()
{
    answersEls.forEach(el => el.checked = false);
}
function getSelected()
{
    let answer = null;
    answersEls.forEach(el =>
  {
        if (el.checked)
        {
            answer = el.id;
        }
    });
    return answer;
}
function startTimer() 
{
    let time =6;
    timerEl.innerText = time;
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timerEl.innerText = time;
        if (time === 0)
       {
            clearInterval(timer);
            // Auto submit after 5 seconds
            const selected = getSelected();
            if (selected)
            {
                userSelections.push(selected);
            if (selected === quizData[currentQuiz].correct) {
                    score++;
                }
            }
            else
            {
                userSelections.push(null);
            }
            currentQuiz++;
            if
            (currentQuiz < quizData.length) {
                loadQuiz();
            }
            else
            {
                localStorage.setItem("score", score);
                localStorage.setItem("userSelections", JSON.stringify(userSelections));
                localStorage.setItem("answers", JSON.stringify(quizData));
                window.location.href = "result.html";
            }
        }
    }, 1000);
}
submitBtn.addEventListener('click', () => {
    const selected = getSelected();
    if (selected) {
        userSelections.push(selected);
        if 
        (selected === quizData[currentQuiz].correct) 
        {
            score++;
            document.querySelector(`#${selected}`).parentElement.classList.add('correct');
        }
        else 
        {
            document.querySelector(`#${selected}`).parentElement.classList.add('incorrect');
            document.querySelector(`#${quizData[currentQuiz].correct}`).parentElement.classList.add('correct');
        }
    }
    else 
    {
        userSelections.push(null);
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) 
    {
        loadQuiz();
    } 
    else 
    {
        localStorage.setItem("score", score);
        localStorage.setItem("userSelections", JSON.stringify(userSelections));
        localStorage.setItem("answers", JSON.stringify(quizData));
        window.location.href = "result.html";
    }
});
loadQuiz();