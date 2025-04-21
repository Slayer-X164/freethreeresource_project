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

console.log(html);

const innerResourceContainer = document.querySelector('.innerResourceContainer')
innerResourceContainer.innerHTML += html

const startbtn = document.querySelector('#startbtn')
startbtn.addEventListener('click',()=>{
    scrollTo('#resource')
})