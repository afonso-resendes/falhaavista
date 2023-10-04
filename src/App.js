import React, { useState } from "react";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./index.css";
import iphone from "./iphone.png"
import amarelo from "./amarelo.jpeg"
import croc from "./croc.jpeg"
import curva from "./curva.jpeg"
import lab from "./lab.jpeg"
import longe from "./longe.jpeg"
import malha from "./malha.jpeg"
import nova from "./nova.jpeg"

const App = () => {
  // Estados para armazenar email, imagem e erros relacionados
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [photoError, setPhotoError] = useState("");

  // Função para lidar com a mudança no campo de email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // Função para lidar com a mudança no campo de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se o campo de email está vazio
    if (!email.trim()) {
      setEmailError("Campo email obrigatório");
    }

    // Verificar se o campo de imagem está vazio
    if (!image) {
      setPhotoError("Campo foto obrigatório");
    }

    // Se o campo de email ou imagem estiverem vazios, retorna e não faz nada mais
    if (!email.trim() || !image) {
      return;
    }

    // Inicializar a variável para armazenar a URL da imagem
    let imageUrl = null;

    // Carregar a imagem para o Firebase Storage
    if (image) {
      setPhotoError("");
      const storageRef = ref(storage, `falhas/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Adicionar o email e a URL da imagem ao Firestore
    const emailCollection = collection(db, "falhas");
    await addDoc(emailCollection, { email, imageUrl });

    // Limpar os campos do formulário
    setEmail("");
    setImage(null);
    alert("Informações submetidas com sucesso.");
  };

  return (
    <body>

    {/* barra de cima */}
    <nav>
      <a href="./">
        {/* <img src="src/assets/step logo.png" /> */}
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

    {/* form */}

    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={emailError ? "error" : ""}
        />
        {emailError && <div>{emailError}</div>}
      </div>
      <div>
        <label>Imagem:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {photoError && <div>{photoError}</div>}
      </div>
      <button type="submit">Submeter</button>
    </form>

    {/* terceira pagina */}

    <div class="zonaTipos" id="tipos">
      <header>
        <h1>Tipos de fendas</h1>
      </header>
      <div class="frases" id="frases">
        <div>
          <blockquote>
          <p>Fendas paralelas ao eixo da estrada</p>
          </blockquote>

          <b>Longitudinal</b>
          <br></br>

          <img src={longe} />
        </div>
        <div>
          <p>Este tipo é particularmente importante pois pode indiciar a ocorrência de um escorregamento no aterro, seja numa estrada, ou numa barragem de aterro.</p>
          <b>Curva</b>
          <br></br>
          <img src={curva} />

        </div>
        <div>
          <p>Conjunto de fendas formando entre si uma malha</p>
          <b>Malha</b>
          <br></br>
          <img src={malha} />

        </div>
        <div>
          <p>É uma evolução do fendilhamento de malha</p>
          <b>Crocodilo</b>
          
          <img src={croc} />

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

    </body>
  );
};

export default App;
