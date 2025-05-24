let h1Elements = [];
const h1Array = [...document.getElementsByClassName('cambio')];
const specialChars = [...'!/|°¡¿@£$%&}{":;?><][+=-_qwertyuiopasdfghjklzxcvbnm'.split('')]

console.log(specialChars)

class Title{
    constructor(id, element){
        this.id = id;
        this.frame = 0;
        this.idx = 0;
        this.element = element;
        this.element.className = `${id}`;
        
        this.originalString = element.innerText;
        this.innerHtml = '';
        this.startTime = null
        this.delay = 650; //tiempo que tarda en aparecer cada letra
        this.intersecting = false;
        this.createSpans();
        document.getElementById('titulo').style.opacity = 1;
        
    }

    createSpans(){
        for(let i = 0; i < this.originalString.length; i++){
            this.innerHtml += `<span>${this.originalString[i]}</span>`;
        }
        this.element.innerHTML = this.innerHtml;
        this.spans = [...this.element.querySelectorAll('span')]
    
    }

    animate(){
        if(this.startTime === null){
            this.startTime = performance.now()
        }
        const currentTime = performance.now()
        const elapsedTime = currentTime - this.startTime;
        if(this.idx < this.originalString.length && this.intersecting){
            this.spans[this.idx].style.opacity = 1;
            this.spans[this.idx].style.transform = `translateX(0)`
            if(this.frame % 3 === 0 && this.spans[this.idx].innerText !== ' '){
                this.spans[this.idx].innerText = specialChars[Math.floor(Math.random() * specialChars.length)]
            }
            if(elapsedTime > this.delay){
                this.spans[this.idx].innerText = this.originalString[this.idx]
                this.startTime = performance.now()
                this.idx++
            }
           
           
           
           
            this.frame++;
        }
 if (this.idx < this.originalString.length && this.intersecting) {
 requestAnimationFrame(this.animate.bind(this));
 } else if (this.idx === this.originalString.length) {
 }
    }

    
    reset(){
        this.idx = 0;
        this.frame = 0;
        this.intersecting = false;
        [...this.element.querySelectorAll('span')].forEach(span => {
            span.style.opacity = 1; // este antes era 0, cuando salia ponia invisible
            span.style.transform = `translateX(-10px)`
        })
    }
}

window.addEventListener('DOMContentLoaded',() => {
    setTimeout(() => {
        h1Array.forEach((header,idx) => {
            h1Elements[idx] = new Title(idx, header)
        })
    
        let options = {
            rootMargin: '0px',
            threshold: 0.0
          }
          
          let callback = (entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    // Check if animation has run before using the hasAnimated flag
                    if(!h1Elements[+entry.target.className].hasAnimated){ // Check if animation has run before
                        h1Elements[+entry.target.className].intersecting = true;
                        h1Elements[+entry.target.className].animate()
                        // Set the flag after the animation starts to ensure it only runs once
                        h1Elements[+entry.target.className].hasAnimated = true; 
                    }
                } // Removed the else block to prevent resetting when not intersecting
            });
          };
        
          let observer = new IntersectionObserver(callback, options);
    
          h1Elements.forEach(instance => {
            observer.observe(instance.element)
            instance.element.style.opacity = 1
          });

    }, 700)
})
