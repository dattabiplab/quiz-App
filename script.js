
let questioncount=-1;
let questionNum=0;
let userscore=0;

const nextbtn = document.querySelector('.next-btn');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryagainbtn = document.querySelector('.tryAgain-btn')

nextbtn.onclick=()=>{
    if(questioncount<questions.length-1)
    {
        questioncount++;
    showquestions(questioncount);
    
    questionNum++;
    questionCounter(questionNum);
    }
    else{
        
        showResultbox();
    }
}

const optionList=document.querySelector('.option-list');

function showquestions(index){
    const questionText=document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}.${questions[index].question}`;
    let optionTag=`<div class="option"><span>${questions[index].Options[0]}</span></div>
    <div class="option"><span>${questions[index].Options[1]}</span></div>
    <div class="option"><span>${questions[index].Options[2]}</span></div>
    <div class="option"><span>${questions[index].Options[3]}</span></div>`;
   

    optionList.innerHTML = optionTag;

    const option= document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++)
    {
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}
function optionSelected(answer)
{
    let givenans=answer.textContent;
    let correctans=questions[questioncount].answer;
    let alloptions=optionList.children.length;
    if(givenans==correctans){
     answer.classList.add('correct');
        userscore++;
     headerscore();
    }
     else
     {
     answer.classList.add('incorrect');
     //if user selected,disable all the options
     for(let i=0;i<alloptions;i++)
        {
            if(optionList.children[i].textContent == correctans)
              optionList.children[i].setAttribute('class','option correct');
            
        }
    }
    for(let i=0;i<alloptions;i++)
        optionList.children[i].classList.add('disabled');
}
function questionCounter(index)
{
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length} Questions`
}
function headerscore()
{
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userscore} / ${questions.length}`;
}
function showResultbox()
{
    quizBox.classList.add('deactive');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userscore} out of ${questions.length}`; 

    const circularProgress = document.querySelector('.circular-progress');
    const ProgressValue = document.querySelector('.progress-value');

    let progressStartValue=-1;
    let progressEndValue=(userscore/questions.length)*100;
    let speed=20;

    let progress = setInterval(()=>{
        progressStartValue++;

        ProgressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(cyan ${progressStartValue * 3.6}deg,rgba(255,255,255,.1) 0deg)`;

        if(progressStartValue == progressEndValue)
           clearInterval(progress);
    },speed);

}
tryagainbtn.onclick=()=>{

    questioncount=0;
    questionNum=1;
    userscore=0;


    quizBox.classList.remove('deactive');
    resultBox.classList.remove('active');



     showquestions(questioncount);
     questionCounter(questionNum);

     headerscore();
}
