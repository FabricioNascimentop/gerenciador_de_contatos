"use client";
import Image from 'next/image'
import { useEffect } from 'react';
import '../../public/output.css'
import { IconTech } from '../components/icons';



export default function Home(){ 
  useEffect(() => {
    let t = 0
    let direcao = 1
    const div = document.querySelector('.tecnologiasContainer')

    function anima(){
      t += direcao

      if(div){
          div.scrollTo({
            top: 0,
            left: t,
          });
      }


      if (t >= 220 || t <= 0) {
      direcao *= -1; 
    }

    requestAnimationFrame(anima);

      
    }

  requestAnimationFrame(anima)
  },[])
  return(
      <main>
        <div className="hero">
          
          <div className="esq">

              <h1>Gerenciador <br/> de contatos</h1>
              <h2>lorem ipsum dolor</h2>
              <div className='tecnologiasContainer'>

                <IconTech teconologia={"python"}/>
                <IconTech teconologia={"flask"}/>
                <IconTech teconologia={"next.js"}/>
                <IconTech teconologia={"react"}/>
                <IconTech teconologia={"javascript"}/>

              </div>

          </div>
          
          <div className="dir">

              <Image src="/img/hero_image_1.png" width={500} height={400} alt='alo'/>

          </div>
        </div>
        <div className='button_home'>
                <a href="/dashboard">INICIAR</a>
        </div>
      </main>
  )
}


