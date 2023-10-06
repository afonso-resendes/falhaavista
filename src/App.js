import React, { useState, useEffect } from "react";
import styles from "./index.css";
import iphone from "./iphone.png";
import amarelo from "./amarelo.jpeg";
import croc from "./croc2.png";
import curva from "./curva.jpeg";
import lab from "./lab.jpeg";
import longe from "./longe.jpeg";
import longe2 from "./longitudinal2.png";
import malha from "./malha.jpeg";
import nova from "./nova.jpeg";
import logo from "./icon.png";

import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const App = () => {
  const [body, setBody] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [bodyError, setBodyError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    setBodyError("");
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setTypeError("");
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };
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
    setPhotoError("");
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      setBodyError("Campo corpo obrigatório");
    }
    if (!type.trim()) {
      setTypeError("Campo tipo obrigatório");
    }
    if (!name.trim()) {
      setNameError("Campo nome obrigatório");
    }

    // Verificar se o campo de email está vazio
    if (!email.trim()) {
      setEmailError("Campo email obrigatório");
    }

    // Verificar se o campo de imagem está vazio
    if (!image) {
      setPhotoError("Campo foto obrigatório");
    }

    // Se o campo de email ou imagem estiverem vazios, retorna e não faz nada mais
    if (
      !email.trim() ||
      !body.trim() ||
      !type.trim() ||
      !name.trim() ||
      !image
    ) {
      return;
    }

    // Inicializar a variável para armazenar a URL da imagem
    let imageUrl = null;

    // Carregar a imagem para o Firebase Storage
    if (image) {
      const storageRef = ref(storage, `falhas/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Adicionar o email e a URL da imagem ao Firestore
    const emailCollection = collection(db, "falhas");
    await addDoc(emailCollection, { email, imageUrl, name, type, body });

    // Limpar os campos do formulário
    setName("");
    setBody("");
    setType("");
    setEmail("");
    setImage(null);
    alert("Informações submetidas com sucesso.");
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY >= (97 * window.innerHeight) / 100 &&
        window.scrollY <= (377 * window.innerHeight) / 100
      ) {
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
            <li>
              <a href="#sobreNosZona">Sobre nós</a>
            </li>
            <li>
              <a href="#carregaZona">Carregar foto de fenda</a>
            </li>
            <li>
              <a href="#tipos">Tipos de fendas</a>
            </li>
            <li>
              <a href="#frases">Galeria de fendas</a>
            </li>
            <li>
              <a href="#contactos">Contactos</a>
            </li>
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
          <p>
            Este projeto foi desenvolvido do ambito da Tese de Mestrado do curso
            de Eng. Informática da FCT-NOVA da aluna Raquel Pena em colaboração
            com o LNEC entre, e tem como objectivo tornar a deteção de falhas em
            pavimentos rodoviários mais prática, fácil, automática e acessível a
            todos por uma foto. Junte se a nós neste projecto e comece ja a
            enviar-nos fotos das falhas que deteta no seu dia a dia.{" "}
          </p>
        </header>
        <div class="imgsSobreNos">
          <img id="imgNova" src={nova} />
          <img id="imgLab" src={lab} />
          <div>
          <img id="imgAmarelo" src={amarelo} />
          <p style={{fontSize: 12, marginRight: 250, marginBottom: 10, fontFamily: "Avenir Next"}}>https://www.sindetransrp.com/noticias/conheca-os-13-principais-defeitos-do-pavimento-das/, 
acedido a 4 Outubro, 2023</p>
          </div>
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
            <p style={{ color: "#00C4CC" }}>Adiciona uma localização</p>
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
          <form onSubmit={handleSubmit}>
            <div>
              <label>Formulário de registo de fenda</label>
              <br></br>
              <textarea value={body} onChange={handleBodyChange}></textarea>
              {bodyError && <div style={{color: "#f00", fontSize: 13, fontFamily: "Avenir Next"}}>{bodyError}</div>}
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <header>
                <input
                  placeholder="Tipo de fenda"
                  value={type}
                  onChange={handleTypeChange}
                />
                {typeError && <div style={{color: "#f00", fontSize: 13, fontFamily: "Avenir Next"}}>{typeError}</div>}
                </header>
                <header>
                <input
                  placeholder="Nome"
                  value={name}
                  onChange={handleNameChange}
                />
                {nameError && <div style={{color: "#f00", fontSize: 13, fontFamily: "Avenir Next"}}>{nameError}</div>}
                </header>
                <header>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <div style={{color: "#f00", fontSize: 13, fontFamily: "Avenir Next"}}>{emailError}</div>}
                </header>
              </div>
            </div>
            <br></br>
            <div>
              <p
                style={{
                  fontFamily: "Avenir Next",
                  fontWeight: "500",
                  fontSize: 18,
                }}
              >
                Upload da imagem
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {photoError && <div style={{color: "#f00", fontSize: 13, fontFamily: "Avenir Next"}}>{photoError}</div>}
            </div>
            <br></br>
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
            <div style={{ display: "block", width: "100%" }}>
              <b style={{ color: "#000", fontSize: 32, fontWeight: "500" }}>
                Longitudinal
              </b>
              <br></br>
              <p style={{marginTop: 22, fontSize: 25}}>
                Zona de passagem dos rodados dos veículos e por vezes junto ao
                eixo.
                <br></br>
                <br></br>
                Classificação:
                <br></br>
                Nível 1: Fenda isolada e fechada (largura da fenda inferior a 2
                mm).
                <br></br>
                Nível 2: Fenda aberta (abertura da fenda entre 2 a 4mm).
                <br></br>
                Nível 3: Fenda grave ramificada, com perda de material e
                acompanhada de deformações e desagregações.
              </p>
            </div>
            <div style={{ display: "block", marginTop: -120, marginLeft: 75 }}>
              <div>
                <img style={{ marginLeft: 155 }} src={longe} />
                <p style={{fontSize: 12, marginRight: 0, marginLeft: 15, marginBottom: 10, color: "#fff", fontFamily: "Avenir Next"}}>Manual de Pavimentos, CEPSA Betumes, 2006 </p>
              </div>
              <div>
              <img style={{ marginLeft: 55 }} src={longe2} />
              <p style={{fontSize: 12, marginRight: 0, marginLeft: 15, marginBottom: 10, color: "#fff", fontFamily: "Avenir Next"}}>Catálogo de Degradações dos Pavimentos Rodoviários 
Volume 2: Gestão da Conservação, EP – Estradas de Portugal, S.A., Março de 2008.
  </p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zonaTipos" id="tipos">
        <div class="frases" id="frases">
          <div style={{ marginTop: -160 }}>
            <div style={{ display: "block", width: "100%" }}>
              <b style={{ color: "#000", fontSize: 32, fontWeight: "500" }}>
                Curva
              </b>
              <br></br>
              <p style={{marginTop: 15, fontSize: 25}}>
                Este tipo é particularmente importante pois pode indiciar a
                ocorrência de um escorregamento no aterro, seja numa estrada, ou
                numa barragem de aterro.
                <br></br>
                <br></br>
                Classificação:
                <br></br>
                Nível 1: Fenda isolada e fechada (largura da fenda inferior a 2
                mm).
                <br></br>
                Nível 2: Fenda aberta (abertura da fenda entre 2 a 4mm).
                <br></br>
                Nível 3: Fenda grave ramificada, com perda de material e
                acompanhada de deformações e desagregações.
              </p>
            </div>
            <div
              style={{
                display: "block",
                width: "80%",
                marginTop: 80,
                marginLeft: 75,
              }}
            >
              <div>
              <img style={{ marginLeft: 155 }} src={curva} />
              <p style={{fontSize: 12, marginRight: 0, marginLeft: 15, marginBottom: 10, color: "#fff", fontFamily: "Avenir Next"}}>Manual de Pavimentos, CEPSA Betumes, 2006 </p>
</div>
            </div>
          </div>
        </div>
      </div>
      <div class="zonaTipos" id="tipos">
        <div class="frases" id="frases">
          <div style={{ marginTop: -250 }}>
            <div style={{ display: "block", width: "100%" }}>
              <b style={{ color: "#000", fontSize: 32, fontWeight: "500" }}>
                Malha
              </b>
              <p style={{ fontSize: 22, marginTop: 16, width: "120%" }}>
                Fendas que formam entre si uma malha de dimensão variável,
                localizadas inicialmente na zona de passagem dos rodados dos
                veículos abrangendo progressivamente toda a largura da via de
                tráfego.
              </p>
              <br></br>
              <br></br>
              <b style={{ color: "#000", fontSize: 32, fontWeight: "500" }}>
                Crocodilo
              </b>
              <p style={{ fontSize: 19, marginTop: 16, width: "120%" }}>
                É uma evolução do fendilhamento de malha.
                <br></br>
                Classificação:
                <br></br>
                Nível 1: Malha com fendilhamento de abertura de pequena dimensão
                e sem ascensão de finos (abertura menos de 2mm e malha mais de
                20cm).
                <br></br>
                Nível 2: Malha com fendilhamento de abertura de todas as
                dimensões e com perda de material (fendas com abertura menor que
                2mm e malha maior que 20cm, ou fendas com abertura entre 2 e 4mm
                para qualquer tipo de malha, ou fendas com abertura maior qu 4mm
                e malha maior que 40cm). Nível 3: Malha com fendilhamento de
                abertura de grande dimensão com perda de material, ascensão de
                finos acompanhada de deformações, ninhos e peladas (fendas com
                abertura maior que 4mm e malha menor que 40cm).
              </p>
            </div>

            <div
              style={{
                display: "block",
                width: "80%",
                marginTop: 0,
                marginLeft: 75,
              }}
            >
              <div>
              <img style={{ marginLeft: 255 }} src={malha} />
              <p style={{fontSize: 12, marginRight: 0, marginLeft: 15, marginBottom: 10, color: "#fff", fontFamily: "Avenir Next"}}>Manual de Pavimentos, CEPSA Betumes, 2006 </p>
              </div>
              <div>
              <img style={{ marginLeft: 155, marginTop: 50 }} src={croc} />
              <p style={{fontSize: 12, marginRight: 0, marginLeft: 15, marginBottom: 10, color: "#fff", fontFamily: "Avenir Next"}}>Manual de Pavimentos, CEPSA Betumes, 2006 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* quarta pagina */}

      <div class="zonaContactos" id="contactos">
        <header>
          <div class="titulo">
            <h1>Contactos</h1>
          </div>
          {/* <div class="infoBranca">
            <b>Phone</b>
            <p>(351) 914867769 </p>
          </div> */}
          <div class="infoBranca">
            <b>Email</b>
            <p>falhaavista@gmail.com</p>
          </div>
        </header>
      </div>
      <script></script>
    </body>
  );
};

export default App;
