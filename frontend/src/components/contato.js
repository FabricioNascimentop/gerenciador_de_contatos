import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Cadeadinho, LixoIcon } from "./icons";
import { fetchImagemContato } from "@/utils/serverActions/fechtImagens";

export default function Contato({ pessoa, setEditar, setApagar }) {
  const { id, nome, tag = "contatos", telefone, email } = pessoa;
  const [imgSrc, setImgSrc] = useState("/img/mockup_pessoa.webp");

  useEffect(() => {
  let isMounted = true;

  fetchImagemContato(id).then((url) => {
    if (isMounted) setImgSrc(url);
  });

  return () => {
    isMounted = false;
  };
}, [id]);


  const handleClick = (action) => {
    if (action === "editar") setEditar(pessoa);
    if (action === "apagar") setApagar(pessoa);
  };

  return (
    <div className="contato">
      <Image
        src={imgSrc}
        width={50}
        height={50}
        alt={`Foto de ${nome}`}
      />
      <div className="nome-tag">
        <span className="nome">{nome}</span>
        <span className="tag">-{tag}-</span>
      </div>
      <div className="telefone">{telefone}</div>
      <div className="email">{email}</div>
      <div className="buttons">
        <div className="editar" onClick={() => handleClick("editar")}>Editar</div>
        <div className="bloquear" onClick={() => handleClick("bloquear")}><Cadeadinho /></div>
        <div className="apagar" onClick={() => handleClick("apagar")}><LixoIcon /></div>
      </div>
    </div>
  );
}
