import React, { useState, useEffect } from "react";
import styles from "./index.css";
import iphone from "./iphone.png"
import amarelo from "./amarelo.jpeg"
import croc from "./croc.jpeg"
import curva from "./curva.jpeg"
import lab from "./lab.jpeg"
import longe from "./longe.jpeg"
import longe2 from "./longitudinal2.png"
import malha from "./malha.jpeg"
import nova from "./nova.jpeg"
import logo from "./icon.png"




const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 97 * window.innerHeight / 100 && window.scrollY <= 277 * window.innerHeight / 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <body>

    {/* barra de cima */}
    <nav className={scrolled ? "navbar-scrolled" : ""}>
      <a href="./">
        <img src={logo} />
        <b>FALHA À VISTA</b>
      </a>
      <div>
      <ul>
        <li><a href="#sobreNosZona">Sobre nós</a></li>
        <li><a href="#carregaZona">Carregar foto de fenda</a></li>
        <li><a href="#tipos">Tipos de fendas</a></li>
        <li><a href="#frases">Galeria de fendas</a></li>
        <li><a href="#contactos">Contactos</a></li>
      </ul>
      
      </div>
    </nav>

    {/* primeira pagina */}
    <div class="zonaInicial">
      <div>
        <h1>Viu alguma fenda num pavimento?</h1>
        <button class="btnIntro">Partilhe Connosco!</button>
      </div>
      <div>
        <img src={iphone} />
      </div>
    </div>
    <div class="sobreNosZona" id="sobreNosZona">
      <header>
        <h1>Sobre Nós</h1>
        <p>Este projeto foi desenvolvido do ambito da Tese de Mestrado do curso de Eng. Informática da FCT-NOVA da aluna Raquel Pena em colaboração  com o LNEC entre, e tem como objectivo tornar a deteção de falhas em pavimentos rodoviários mais prática, fácil, automática e acessível a todos por uma foto. Junte se a nós neste projecto e comece ja a enviar-nos fotos das falhas que deteta no seu dia a dia. </p>
      </header>
      <div class="imgsSobreNos">
        <img id="imgNova" src={nova} />
        <img id="imgLab" src={lab} />
        <img id="imgAmarelo" src={amarelo} />
      </div>
    </div>

    {/* segunda pagina */}
    <div class="carregaZona" id="carregaZona">
      <header>
        <h1>Carregar Foto de fendas</h1>
      </header>
      <div>
        <button id="b1">
          <b>01</b>
          <p>Carrega a tua foto</p>
        </button>
        <button id="b2">
          <b>02</b>
          <p style={{color: "#00C4CC"}}>Adiciona uma localização</p>
        </button>
        <button>
          <b>03</b>
          <p>Escreve uma breve descrição</p>
        </button>
      </div>
    </div>


    <div id="zonaForm">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <form>
        <div>
          <label>Formulário de registo de fenda</label>
          <br></br>
          <textarea></textarea>
          <br></br>
          <div style={{display: "flex", justifyContent: "space-between"}}>
          <input
            placeholder="Tipo de fenda"
            // value={email}
            // onChange={handleEmailChange}
          />
          <br></br>
          <input
            placeholder="Nome"
            // value={email}
            // onChange={handleEmailChange}
          />
          <br></br>
          <input
            placeholder="Email"
            type="email"
            // value={email}
            // onChange={handleEmailChange}
          />
          {/* {emailError && <div>{emailError}</div>} */}
          </div>
        </div>
        <br></br>
        <div>
          <p style={{fontFamily: "Avenir Next", fontWeight: "500", fontSize: 18}}>Upload da imagem</p>
          <input type="file" accept="image/*" />
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {/* {photoError && <div>{photoError}</div>} */}
        </div>
        <button type="submit">Submeter</button>
      </form>
      </div>
    </div>

    

    {/* terceira pagina */}

    <div class="zonaTipos" id="tipos">
      <header>
        <h1>Tipos de fendas</h1>
      </header>
      <div class="frases" id="frases">
        <div>
          <div style={{display: "block", width: "100%"}}>
          <b style={{color: "#000", fontSize: 32, fontWeight: "500"}}>Longitudinal</b>
          <br></br>
          <p>Zona de passagem dos rodados dos veículos e por vezes junto ao eixo.
          <br></br>
          <br></br>
          Classificação:
          <br></br>
          Nível 1: Fenda isolada e fechada (largura da fenda inferior a 2 mm).
          <br></br>
          Nível 2: Fenda aberta (abertura da fenda entre 2 a 4mm).
          <br></br>
          Nível 3: Fenda grave ramificada, com perda de material e 
          acompanhada de deformações e desagregações.</p>
          </div>
          <div style={{display: "block", marginTop: -120, marginLeft: 75}}>
          <img style={{marginLeft: 155}} src={longe} />
          <img style={{marginLeft: 55}} src={longe2} />
          </div>
        </div>
    
      </div>
    </div>
    <div class="zonaTipos" id="tipos">
      <div class="frases" id="frases">
        <div style={{marginTop: -160}}>
          <div style={{display: "block", width: "100%"}}>
          <b style={{color: "#000", fontSize: 32, fontWeight: "500"}}>Curva</b>
          <br></br>
          <p>Este tipo é particularmente importante pois pode indiciar a ocorrência de um escorregamento no aterro, seja numa estrada, ou numa barragem de aterro. 
          <br></br>
          <br></br>
          Classificação:
          <br></br>
          Nível 1: Fenda isolada e fechada (largura da fenda inferior a 2 mm).
          <br></br>
          Nível 2: Fenda aberta (abertura da fenda entre 2 a 4mm).
          <br></br>
          Nível 3: Fenda grave ramificada, com perda de material e 
          acompanhada de deformações e desagregações.
          </p>
 
          </div>
          <div style={{display: "block", width: "80%", marginTop: 80, marginLeft: 75}}>
          <img style={{marginLeft: 155}} src={curva} />
          </div>
        </div>
    
      </div>
    </div>
    <div class="zonaTipos" id="tipos">
      <div class="frases" id="frases">
        <div style={{marginTop: -250}}>
          <div style={{display: "block", width: "100%"}}>
          <b style={{color: "#000", fontSize: 32, fontWeight: "500"}}>Malha</b>
          <p>Fendas que formam entre si uma malha de dimensão variável, localizadas inicialmente na zona de passagem dos rodados dos veículos abrangendo progressivamente toda a largura da via de tráfego.
          </p>
          <br></br>
          <br></br>
          <b style={{color: "#000", fontSize: 32, fontWeight: "500"}}>Crocodilo</b>
        <p style={{fontSize: 25, width: "120%"}}>  
É uma evolução do fendilhamento de malha.
<br></br>
Classificação:
<br></br>
Nível 1: Malha com fendilhamento de abertura de pequena dimensão e sem ascensão de finos (abertura menos de 2mm e malha mais de 20cm).
  <br></br>
Nível 2: Malha com fendilhamento de abertura de todas as dimensões e com perda de material (fendas com abertura menor que 2mm e malha maior que 20cm, ou fendas com abertura entre 2 e 4mm para qualquer tipo de malha, ou fendas com abertura maior qu 4mm e malha maior que 40cm).
Nível 3: Malha com fendilhamento de abertura de grande dimensão com perda de material, ascensão de finos acompanhada de deformações, ninhos e peladas (fendas
com abertura maior que 4mm e malha menor que 40cm).
          </p>
 
          </div>
          
          <div style={{display: "block", width: "80%", marginTop: 0, marginLeft: 75}}>
          <img style={{marginLeft: 255}} src={malha} />
          <img style={{marginLeft: 155}} src={croc} />
          </div>
        </div>
    
      </div>
    </div>
    
   

    {/* quarta pagina */}

    <div class="zonaContactos" id="contactos">
      <header>
        <div class="titulo"><h1>Contactos</h1></div>
        <div class="infoBranca">
          <b>Phone</b>
          <p>(351) 914867769 </p>
        </div>
        <div class="infoBranca">
          <b>Email</b>
          <p>r.pena@campus.fct.unl.ot</p>
        </div>
      </header>
    </div>
    <script>
      
    </script>

    </body>
    
  );
};

export default App;
