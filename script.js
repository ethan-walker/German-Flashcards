flashcardContainer = document.querySelector(".flashcard-container");

cards = document.querySelectorAll(".flashcard");
cards.forEach(card => flashcardHandler(card));

function flashcardHandler(elem) {
   var
		initialX,
      initialY,
		rotate = 0,
      x = y = 0,
      cardWidth,
      moving
		;

   elem.onmousedown = elem.ontouchstart = beginDrag;

   function cardDisp() {
      centerPos = x + initialX + (cardWidth / 2);
      return (2 * centerPos) / window.innerWidth - 1
   }

   function beginDrag(e) {
      x = y = 0;
      rect = elem.getBoundingClientRect();

      initialX = rect.x;
      initialY = rect.y;
      cardWidth = rect.width;

      oldCursorX = e.clientX || e.targetTouches[0].pageX;
      oldCursorY = e.clientY || e.targetTouches[0].pageY;

      document.onmouseup = document.ontouchend = endDrag;
		document.onmousemove = document.ontouchmove = updateDragPos;
   }

   function updateDragPos(e) {
      let deltaX = (e.clientX || e.targetTouches[0].pageX) - oldCursorX;
		let deltaY = (e.clientY || e.targetTouches[0].pageY) - oldCursorY;

		x += deltaX;
      y += deltaY;
      
      elem.style.translate = x + "px " + y + "px";
      elem.style.rotate = cardDisp() * 10 + "deg";

      oldCursorX = e.clientX || e.targetTouches[0].pageX;
      oldCursorY = e.clientY || e.targetTouches[0].pageY;

      document.body.style.setProperty("--bg-opacity", (Math.abs(cardDisp()) * 1.7));

      if (cardDisp() > 0) {
         document.body.style.setProperty("--bg-color","var(--color-green)")
      }
      else {
         document.body.style.setProperty("--bg-color","var(--color-red)")
      }
      moving = true;
   }
   function endDrag(e) {
		document.onmouseup = document.ontouchend = null;
		document.onmousemove = document.ontouchmove = null;

      if(Math.abs(cardDisp()) < 0.5) {
         elem.classList.add()
         elem.animate([
            {
               translate: "0px 0px",
               rotate: "0deg"
            }
         ],
            {
               duration: 200,
               // fill: "forwards"
            }
         )

         // need the delay otherwise animation doesn't play

         window.setTimeout(() => {
            elem.style.rotate = null;
            elem.style.translate = null;
         }, 100);
      }
      else if (cardDisp() < 0) {
         elem.classList.add("swiped", "swiped-left")
         elem.animate([
            {
               translate: `${-1 * (initialX + cardWidth)}px 0px`,
               rotate: "-10deg"
            }
         ],
            {
               duration: 200,
               fill: "forwards"
            }
         )
         window.setTimeout(() => {
            elem.remove();
         }, 200);
      }
      else {
         elem.classList.add("swiped", "swiped-right")
         elem.animate([
            {
               translate: `${initialX + cardWidth}px 0px`,
               rotate: "10deg"
            }
         ],
            {
               duration: 200,
               fill: "forwards"
            }
         )
         window.setTimeout(() => {
            elem.remove();
         }, 200);
      }

      document.body.animate(
         [
            {
               "--bg-opacity": 0
            }
         ],
         {
            duration: 500,
            // fill: "forwards"
         }
      )
      window.setTimeout(() => {
         document.body.style.setProperty("--bg-opacity", 0);
      }, 400);

      // BECAUSE FOR SOME REASON THE MOUSEUP EVENT TRIGGERS ON MOBILE
      if (!moving && e.type !== "mouseup") {
         elem.classList.toggle("flipped");
      }
      moving = false;
	}
}

// function dragNote(note) {
// 	var
// 		x = y = 0,
// 		oldCursorX,
// 		oldCursorY,
// 		noteX = noteY = 0,
// 		newOriginX = newOriginY = originX = originY = 0,
// 		rotate = 0,
// 		translateX = translateY = 0
// 		;
	
// 	note.onmousedown = beginDrag;

// 	function beginDrag(e) {
// 		oldCursorX = e.clientX;
// 		oldCursorY = e.clientY;

// 		let rect = note.getBoundingClientRect();
		
// 		let relCursorX = e.clientX - rect.x;
// 		let relCursorY = e.clientY - rect.y;

// 		let h = 200;

// 		console.log(rotate);
			
// 		newOriginY = (h * (dSin(rotate)**2)) - (relCursorX * dSin(rotate)) + (relCursorY * dCos(rotate));
// 		newOriginX = (dTan(rotate) * newOriginY) + ((relCursorX - (h * dSin(rotate))) * dCos(rotate))

// 		originX = newOriginX
// 		originY = newOriginY

// 		note.style.translate = translateX + "px " + translateY + "px";
		
// 		note.style.transformOrigin = originX + "px " + originY + "px";

// 		note.style.setProperty("--x", originX);
// 		note.style.setProperty("--y", originY);
		
// 		document.onmouseup = endDrag;
// 		document.onmousemove = updateDragPos;

// 		note.classList.add("dragging");
// 	}
	
// 	function updateDragPos(e) {
// 		let deltaX = e.clientX - oldCursorX;
// 		let deltaY = e.clientY - oldCursorY;

// 		noteX += deltaX;
// 		noteY += deltaY;
		
// 		note.style.top = noteY + "px";
// 		note.style.left = noteX + "px";

// 		oldCursorX = e.clientX;
// 		oldCursorY = e.clientY;
// 	}
// 	function endDrag() {
// 		rotate = randBetween(-5, 5);
// 		note.style.rotate = rotate + "deg";
		
// 		document.onmouseup = null;
// 		document.onmousemove = null;

// 		note.classList.remove("dragging");
// 	}
// }