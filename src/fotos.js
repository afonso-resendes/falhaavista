import React, { useState } from "react";
import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Fotos = () => {
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
    <div>
      <h1>fotos</h1>
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
    </div>
  );
};

export default Fotos;
