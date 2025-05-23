import './style.css'



const resourceArray = [
    {
        from:'youtube',
        title:'Three.js Beginner crash course',
        about:'Taught by industry expert Jesse Zhou, this course will guide you from the basics to advanced techniques, empowering you to create breathtaking 3D experiences on the web.',
        openLink:'https://youtu.be/KM64t3pA4fs?si=jbrbBZiyZUNDliPI',
        level:'beginner'
    },
    {
        from: 'documentation',
        title: 'Getting Started – Three.js Docs',
        about: 'Official Three.js documentation for getting started. Covers basic setup, creating a scene, camera, renderer, and adding objects.',
        openLink: 'https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene',
        level:'beginner'

    },
    {
        from: 'youtube',
        title: ' Three.js Tutorial For Absolute Beginners ',
        about: 'This tutorial covers the basics of the 3D library Three.js by Wael Yasmina',
        openLink: 'https://youtu.be/xJAfLdUgdc4?si=91sFs4g_4dsdHqCD',
        level:'beginner'

    },
    {
        from: 'youtube',
        title: 'Adding a 3D model to a website using THREE.JS',
        about: 'Perfect for beginners and experienced developers alike, we will dive into the fundamentals of 3D rendering and scene management',
        openLink: 'https://youtu.be/lGokKxJ8D2c?si=uXMNXz95M7XivZj2',
        level:'intermediate'

    },
    {
        from: 'youtube',
        title: 'Amazing Scrolling Animation Website with Three.Js',
        about: ' Animation with Three.Js also how create extremely interesting animations when users scroll the page with Three.js easily.',
        openLink: 'https://youtu.be/zNXQS2DfckU?si=1n2SWurOUWba3O7k',
        level:'intermediate'

    },
    {
        from: 'youtube',
        title: 'Make a Globe with Custom Shaders',
        about: 'Every important piece of complex jargon will be explained in plainspeak within this tutorial, including: Vertex Shaders, Fragment Shaders, UVs, and Normals.',
        openLink: 'https://youtu.be/vM8M4QloVL0?si=IyBtKvkGfvZzJPIZ',
        level:'intermediate'

    },
    {
        from: 'youtube',
        title: 'Three.js Shaders (GLSL) Crash Course For Absolute Beginners',
        about: 'discussing things like how shaders work, GLSL language, vertex shader, fragment shader, dot product, useful GLSL functions',
        openLink: 'https://youtu.be/oKbCaj1J6EI?si=if3Rsmrb9tL1lL-F',
        level:'advanced'

    },
    {
        from: 'youtube',
        title: 'three.js - Dynamic Shadows',
        about: 'Shadows play a very big role in the lighting of 3D web development it gives a feel of real-life so in three JS',
        openLink: 'https://youtu.be/mVG6kEEAGA0?si=hEs1IFmheuXflrVo',
        level:'beginner'

    },
    {
        from: 'youtube',
        title: 'Three.js Post-processing effect',
        about: 'A lesson on how to use UnrealBloomPass, sobel, dot and colorify post processing effects in three.js',
        openLink: 'https://youtu.be/BOMfiXnq7Y8?si=pP_wZV8tRpMLeQYB',
        level:'advanced'

    },
    {
        from: 'youtube',
        title: 'React Three Fiber Crash Course for Beginners',
        about: 'This is a step-by-step guide into creating 3D web applications using the WebGL/WebGPU, React, Three.js, React Three Fiber, Drei',
        openLink: 'https://youtu.be/jKy2Rm7EVOk?si=xyXAeN9WBq3YJViu',
        level:'beginner'

    },
    // {
    //     from: 'youtube',
    //     title: '',
    //     about: '',
    //     openLink: '',
    //     level:''

    // },

]

let html = resourceArray.map((e)=>{
    return ` <div class="eachResource">
              <div class="from_level">
                <h3 class="from">${e.from}</h3>
                <h3 class="resourceLevel">${e.level}</h3>
              </div>
              <h2 class="resourceTitle">${e.title}</h2>
              <p class="about">${e.about}</p>
              <div class="resourceBtnContainer">
                <a href="${e.openLink}" target="_blank">open resource</a>
              </div>
            </div>`
}).join('')

const innerResourceContainer = document.querySelector('.innerResourceContainer')
innerResourceContainer.innerHTML += html

const startbtn = document.querySelector('#startbtn')
const resourceSection = document.querySelector('#resource')
startbtn.addEventListener('click',()=>{
    resourceSection.scrollIntoView({behavior:'smooth'})

})

//menubar
const mobileNav = document.querySelector('.mobileNav')
const openMenu = document.querySelector('#openMenu')
const closeMenu = document.querySelector('#closeMenu')

openMenu.addEventListener('click',()=>{
    openMenu.style.display = "none"
    closeMenu.style.display = "block"
    gsap.to(mobileNav, {
        right: 0,
        duration: 0.8,
        ease: "power2.out",
     });
    gsap.from('.links a',{
        opacity:0,
        x:30,
        stagger:0.3,
        duration:0.5,
        ease:'power2.out'
    })
  })

  //card animation



    document.querySelectorAll('.eachResource').forEach((card)=>{
        gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end:'top 50%',
            //   markers:true,
              scrub:true
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            scale:0.5,
            ease: "power3.out"
          });
    })


closeMenu.addEventListener('click',()=>{
    closeMenu.style.display = "none"
    openMenu.style.display = "block"
    gsap.to(mobileNav, {
        right: "-100%",
        duration: 0.5,
        ease: "power3.in"
    });
})

window.addEventListener('resize',()=>{
    if(window.innerWidth>600){
        openMenu.style.display = "none"
    }
    else{
        openMenu.style.display=''
    }
})
//making nav links work properly
const navLinks = document.querySelectorAll('.navLinks')
navLinks.forEach((link)=>{
    link.addEventListener('click',()=>{
        closeMenu.style.display = "none"
        openMenu.style.display = "block"
        gsap.to(mobileNav, {
            right: "-100%",
            duration: 0.3,
            ease: "power3.in"
        });
    })
})
