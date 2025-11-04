const imagePool = ["amazon", "android", "apple", "nvidia", "openai", "twitterx", "wifi", "youtube"];
const card = document.querySelectorAll(".card");
var flippedCards = [];
var firstCard = "";
var secondCard = "";
var frontImg = "";
var backImg = "";
var backImg1 = "";
var backImg2 = "";
var imgAlt1 = "";
var imgAlt2 = "";
var score = 0;
var targetCollection = [];
var index = 0;

function cardShuffle() {
    for (var i=0; i<imagePool.length; i++) {
        let imgUrl = "./images/" + imagePool[i] + ".svg";
        let imgAlt = imagePool[i];
        var target = "";

        for (let j=0; targetCollection.length<card.length; j++) {
            let randomCardIndex = (Math.floor(Math.random() * card.length)) + 1;
            let temp = ".front" + randomCardIndex;  // className range: 1 - 16
            
            if (!targetCollection.includes(temp)) {
                if (temp !== null && temp !== "" && temp !== undefined) {
                    targetCollection.push(temp);
                    console.log("targetCollection:", targetCollection);
                } 
            }
        }

        for (let k=0; k<2; k++) { 
            if (k < 1) {
                if (index < 1) {
                    target = targetCollection[index];
                    console.log("T1", target, "alt", imgAlt);
                } else {
                    index += 1;
                    target = targetCollection[index];
                    console.log("T1", target, "alt", imgAlt);
                }
                document.querySelector(target).setAttribute("src", imgUrl);
                document.querySelector(target).setAttribute("alt", imgAlt);
            } else {
                index += 1;
                target = targetCollection[index];
                console.log("T2", target, "alt", imgAlt);
               
                document.querySelector(target).setAttribute("src", imgUrl);
                document.querySelector(target).setAttribute("alt", imgAlt);
            } 
        }
    }
}
            
function initAll() {
    firstCard = "";
    secondCard = "";
    frontImg = "";
    backImg = "";
    backImg1 = "";
    backImg2 = ""
    imgAlt1 = "";
    imgAlt2 = "";
}

function comparison() {
    if (flippedCards.length >= 2 && flippedCards.length % 2 === 0) {
        if (imgAlt1 === imgAlt2 && imgAlt1 !== "" && imgAlt2 !== "" && imgAlt1 !== undefined && imgAlt2 !== undefined) {

            console.log("comparison: ", imgAlt1 === imgAlt2);
            console.log("Bingo!");
            score += 100;
            document.querySelector(".container h2").innerHTML = "Score: " + score;
            
            const addHighlight = setTimeout(function() {
                if (score === 800) {
                    document.querySelector(".flip-cards").classList.add("highlight");
                }  
            }, 500)

            const congratulate = setTimeout(function() {
                if (score === 800) {
                    alert("Perfect");
                }  
            }, 1000)

            const removeHighlight = setTimeout(function() {
                document.querySelector(".flip-cards").classList.remove("highlight");
            }, 1000);
            
             
        } else {
            console.log("comparison: ", imgAlt1 === imgAlt2);
            console.log("Wrong!");
            score -= 100;
            document.querySelector(".container h2").innerHTML = "Score: " + score;
            
            if (firstCard !== "" && secondCard !== "" && firstCard !== undefined && secondCard !== undefined) {
                const flipBack = setTimeout(function() {
                    if (firstCard.classList.contains("flip")) {
                        firstCard.classList.remove("flip");
                    }
                        
                    if (secondCard.classList.contains("flip")) {
                        secondCard.classList.remove("flip");
                    }

                    if (backImg1.classList.contains("hide")) {
                        backImg1.classList.remove("hide");
                    } 
                    
                    if (backImg2.classList.contains("hide")) {
                        backImg2.classList.remove("hide");
                    }
              
                }, 1000);
            }  
            flipBack;
        }
        initAll();
    }
}

for (let i=0; i<card.length; i ++) {
    card[i].addEventListener("click", function() { 
        frontImg = this.querySelector(".front img");
        backImg = this.querySelector(".back img");
        
        if (firstCard === "") {
            firstCard = card[i];
        } else {
            secondCard = card[i];
        }
       
        if (this.classList.contains("flip")) {
            alert("Already flipped!");
        } else {
            flippedCards.push(card[i]);
    
            if (imgAlt1 === "") {
                imgAlt1 = frontImg.getAttribute("alt");
            } else {
                imgAlt2 = frontImg.getAttribute("alt");
            }

            // console.log("chosen: " + imgAlt1 + "," + imgAlt2);

            if (backImg1 === "") {
                backImg1 = backImg;
            } else {
                backImg2 = backImg;
            }
            
            if (!firstCard.classList.contains("flip")) {
                firstCard.classList.add("flip");
            } else if (!secondCard.classList.contains("flip")) {
                secondCard.classList.add("flip");
            }
            
            if (!backImg1.classList.contains("hide")) {
                backImg1.classList.add("hide");
            } else if (!backImg2.classList.contains("hide")) {
                backImg2.classList.add("hide");
            }
            
            // console.log("flippedCards: " + flippedCards)
        }

        if (firstCard !== "" && secondCard !== "" && firstCard !== undefined && secondCard !== undefined) {
            comparison();
        }
    });
}

cardShuffle();

