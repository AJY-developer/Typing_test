import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import './App.css'
import InputField from './components/InputField'



function App() {
    const [current, update] = useState('');
    const word = useRef(0)
    const type = useRef(true)
    const sec = useRef()
    const topOffSet = useRef(229)
    const backSpaceCount = useRef(0)


    function _(el) {
        return document.querySelector(el);
    }


    function settimer() {
        // sec.current && clearInterval(sec.current);
        let seconds = 60
        sec.current = setInterval(() => {
            seconds -= 1;
            _(".timer").innerHTML = (seconds < 10) ? `0${seconds}` : seconds;
            if (!seconds) {
                clearInterval(sec.current)
                displayScore();
            }
        }, 1000);

    }
    function calculation(data) {


        let returnValue = data.length;
        for (var i = 0; i < data.length; i++) {
            returnValue += data[i].innerText.length;
        }

        return returnValue;
    }

    const data = "about|above|add|after|again|air|all|almost|along|also|always|America|an|and|animal|another|answer|any|are|around|as|ask|at|away|back|be|because|been|before|began|begin|being|below|between|big|book|both|boy|but|by|call|came|can|car|carry|change|children|city|close|come|could|country|cut|day|did|different|do|does|don't|down|each|earth|eat|end|enough|even|every|example|eye|face|family|far|father|feet|few|find|first|follow|food|for|form|found|four|from|get|girl|give|go|good|got|great|group|grow|had|hand|hard|has|have|he|head|hear|help|her|here|high|him|his|home|house|how|idea|if|important|in|Indian|into|is|it|its|it's|just|keep|kind|know|land|large|last|later|learn|leave|left|let|letter|life|light|like|line|list|little|live|long|look|made|make|man|many|may|me|mean|men|might|mile|miss|more|most|mother|mountain|move|much|must|my|name|near|need|never|new|next|night|no|not|now|number|of|off|often|oil|old|on|once|one|only|open|or|other|our|out|over|own|page|paper|part|people|picture|place|plant|play|point|put|question|quick|quickly|quite|read|really|right|river|run|said|same|saw|say|school|sea|second|see|seem|sentence|set|she|should|show|side|small|so|some|something|sometimes|song|soon|sound|spell|start|state|still|stop|story|study|such|take|talk|tell|than|that|the|their|them|then|there|these|they|thing|think|this|those|thought|three|through|time|to|together|too|took|tree|try|turn|two|under|until|up|us|use|very|walk|want|was|watch|water|way|we|well|went|were|what|when|where|which|while|white|who|why|will|with|without|word|work|world|would|write|year|you|young|your"

    const arr = data.split("|")
    function showWords() { // To print the text after rendering
        _(".showText").innerHTML = '';

        for (var i = 0; i < arr.length; i++) {
            _(".showText").innerHTML += `<span class=${(i == 0) ? "pending" : " "}>${arr[Math.floor((Math.random() * arr.length))]}</span>`
        }
    }


    function shiftCtrl(text) {  // shift controll after every space
        const pending = _(".pending")
        const nextWord = pending.parentNode.children[word.current + 1]

        if (nextWord.offsetTop > topOffSet.current) {
            // console.log('asdf')
            for (var i = 0; i <= word.current; i++) {
                pending.parentNode.children[i].style.display = 'none'
            }
        }

        if (text.trim() == pending.innerText) {
            pending.classList.add('right')
            pending.classList.remove("wrong_at_time")
        }
        else {
            pending.classList.add('wrong')
            pending.classList.remove("wrong_at_time")
        }

        pending.classList.remove('pending')
        nextWord.classList.add('pending')
        word.current += 1
        topOffSet.current = nextWord.offsetTop

    }

    function updateInputValue(e) {  // this function run on every keystroke
        update(e.target.value)

        if (e.nativeEvent.data == ' ') { // if we enter space control goes to shiftcontrol function and input value set empty
            if (e.nativeEvent.data == ' ' && e.target.value.length == 1) {
                update('')
            } else {
                shiftCtrl(e.target.value);
                update('')
            }

        } else {
            const pending = _(".pending")
            if (pending.innerText.indexOf(e.target.value)) { // check the value at every keystroke it matches or not
                pending.classList.add("wrong_at_time")
            } else {
                pending.classList.remove("wrong_at_time")
            }
        }

        if (word.current == 0 && type.current == true && e.target.value.length == 1) {
           
            settimer();
            type.current = false;
        }

    }

    function targetKey(e) {

        if (e.key == "Backspace" && current != '') {
            backSpaceCount.current++
           
        }
    }

    function displayScore() {

        const correctWords = document.querySelectorAll(".right");
        const wrongWords = document.querySelectorAll(".wrong");
        let correctChr = calculation(correctWords)
        let wrongChr = calculation(wrongWords)
        const keyStrokes = correctChr + wrongChr

        const netSpeed = Math.round(keyStrokes / 5 - wrongChr / 5);
        const accuracy = Math.round((correctChr / (keyStrokes + backSpaceCount.current)) * 10000) / 100;

        console.log(`${netSpeed} ${accuracy}`)

        _(".keystrokes>div>span:nth-child(1)").innerText = `${correctChr}`
        _(".keystrokes>div>span:nth-child(2)").innerText = `${wrongChr}`
        _(".keystrokes>div>span:nth-child(3)").innerText = `${keyStrokes}`
        _(".typingSpeed>div").innerText = `${netSpeed} WPM`
        _(".accuracy>div:nth-child(2)").innerText = `${accuracy}%`
        _(".correctWord>div:nth-child(2)").innerText = `${correctWords.length}`
        _(".wrongWord>div:nth-child(2)").innerText = `${wrongWords.length}`
        _(".resultSection").style.display = "flex"
        _(".showText").style.display = "none"

    }


    function restartFunc(){
        showWords();
        _(".showText").style.display = "flex"
        word.current  =0
        type.current = true
        _(".resultSection").style.display = "none"
        _(".timer").innerHTML = 60
        backSpaceCount.current = 0;
    }




    useEffect(() => {
        showWords();
        document.getElementById("inputField").focus();
    }, [])

    return (
        <>
            <div className="container">
                <div className="heading">
                    <h3>Start typing</h3>
                </div>

                <div className="showText" style={{ userSelect: "none" }}>

                </div>
                <InputField current={current} updateInputValue={updateInputValue} targetKey={targetKey}  restartFunc={restartFunc}/>
                <div className="resultSection">
                    <h3 className="results">Results</h3>
                    <div className="showResult">
                        <div className="typingSpeed">
                            <div style={{ color: "green" }}>50 WPM</div>
                        </div>
                        <div className="keystrokes">
                            <div>Keystrokes</div>
                            <div>(<span>200</span>/<span>30</span>)<span>230</span></div>
                        </div>
                        <div className="accuracy">
                            <div>Accuracy</div>
                            <div>93.45%</div>
                        </div>
                        <div className="correctWord">
                            <div>Correct words</div>
                            <div>40</div>
                        </div>
                        <div className="wrongWord">
                            <div>Wrong words</div>
                            <div>6</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default App
