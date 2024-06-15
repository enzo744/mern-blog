import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiOutlineArrowLeft } from "react-icons/hi";


export default function CreatePsw() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/psw/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      // if(data.success === false){
      //   setPublishError(data.message);
      //   return;
      // }
      if (res.ok) {
        setPublishError(null);
        navigate(`/psw/${data.slug}`);
        return;
      }
    } catch (error) {
      setPublishError("Qualcosa e' andato storto");
    }
  };
  return (
    <div className="min-h-screen mt-16">
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center text-3xl my-7 font-serif">
          Crea nuova voce
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 maw-w-600">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Nome voce* (campo obblig. ed unico)"
              required
              id="title"
              className="flex-1 font-serif"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              className="font-serif"
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="nessuna">Nessuna categoria</option>
              <option value="ufficio">Ufficio</option>
              <option value="personali">Personali</option>
              <option value="social">Social Network</option>
              <option value="variemail">Email</option>
            </Select>
          </div>
          <div className="">
            <TextInput
              className="font-serif"
              type="email"
              placeholder="Inserire solo formato email (xxxx@dominio.com)"
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative text-2xl">
            <TextInput
              className="font-serif"
              type={open === false ? "password" : "text"}
              placeholder="Password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div className="absolute top-2 right-3">
              {open === false ? (
                <AiFillEye onClick={toggle} className="cursor-pointer"/>
              ) : (
                <AiFillEyeInvisible onClick={toggle} className="cursor-pointer"/>
              )}
            </div>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Scrivi qualcosa..."
            className="h-72 mb-12"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <div className="flex flex-row gap-4">
          <Link to="/dashboard?tab=psws">
              <Button
                outline
                gradientDuoTone="tealToLime"
                type="submit"
                className="font-serif"
              >
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <Button
              outline
              gradientDuoTone="greenToBlue"
              type="submit"
              className="font-serif w-full"
            >
              Salva dati
            </Button>
            
          </div>
          {publishError && (
            <Alert className="mt-4" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
