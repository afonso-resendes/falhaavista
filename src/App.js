import React, { useState } from "react";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./index.css";
import iphone from "./iphone.png"

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
    <nav>
      <a href="./">
        {/* <img src="src/assets/step logo.png" /> */}
        <b>FALHA À VISTA</b>
      </a>
      <div>
      <ul>
        <li>Sobre nós</li>
        <li>Carregar foto de fenda</li>
        <li>Tipos de fendas</li>
        <li>Galeria de fendas</li>
        <li>Contactos</li>
      </ul>
      
      </div>
    </nav>
    <div class="zonaInicial">
      <div>
        <h1>Viu alguma fenda num pavimento?</h1>
        <button class="btnIntro">Partilhe Connosco!</button>
      </div>
      <div>
        <img src={iphone} />
      </div>
    </div>
    <div class="sobreNosZona">
      <header>
        <h1>Sobre Nós</h1>
        <p>Este projeto foi desenvolvido do ambito da Tese de Mestrado do curso de Eng. Informática da FCT-NOVA da aluna Raquel Pena em colaboração  com o LNEC entre, e tem como objectivo tornar a deteção de falhas em pavimentos rodoviários mais prática, fácil, automática e acessível a todos por uma foto. Junte se a nós neste projecto e comece ja a enviar-nos fotos das falhas que deteta no seu dia a dia. </p>
      </header>
    </div>
    
    <div class="carregaZona">
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
    <div class="zonaTipos">
      <header>
        <h1>Tipos de fendas</h1>
      </header>
      <div class="frases">
        <div>
          <blockquote>
          <p>Fendas paralelas ao eixo da estrada</p>
          </blockquote>

          <b>Longitudinal</b>
        </div>
        <div>
          <p>Este tipo é particularmente importante pois pode indiciar a ocorrência de um escorregamento no aterro, seja numa estrada, ou numa barragem de aterro.</p>
          <b>Curva</b>
        </div>
        <div>
          <p>Conjunto de fendas formando entre si uma malha</p>
          <b>Malha</b>
        </div>
        <div>
          <p>É uma evolução do fendilhamento de malha</p>
          <b>Crocodilo</b>
        </div>
      </div>
    </div>
    <div class="zonaContactos">
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
