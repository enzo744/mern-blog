import { Alert, Button, Select, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CreatePsw() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await fetch("/api/psw/create",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      // if(data.success === false){
      //   setPublishError(data.message);
      //   return;
      // }
      if(res.ok){
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
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create page psw
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 maw-w-600">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title* (campo obblig. ed unico)"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
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
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative text-2xl">
            <TextInput
              className=""
              type={open === false ? "password" : "text"}
              placeholder="Password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div className="absolute top-2 right-3">
              {open === false ? (
                <AiFillEye onClick={toggle} />
              ) : (
                <AiFillEyeInvisible onClick={toggle} />
              )}
            </div>
          </div>
          <Textarea
            placeholder="Aggiungi commento... Max 600 caratteri"
            rows="10"
            maxLength="600"
            id="commento"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, commento: e.target.value })
            }
          />
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Salva dati
          </Button>
          {publishError && <Alert className="mt-4" color='failure'>
            {publishError}
          </Alert>}
        </form>
      </div>
    </div>
  );
}
