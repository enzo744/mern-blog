import { Button, Select, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function CreatePsw() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((length > 600)) {
      return;
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create page psw
        </h1>
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4 maw-w-600">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title* (campo obblig. ed unico)"
              required
              id="title"
              className="flex-1"
              // onChange={(e) =>
              //   setFormData({ ...formData, title: e.target.value })
              // }
            />
            <Select>
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
              // onChange={handleChange}
            />
          </div>
          <div className="relative text-2xl">
            <TextInput
              className=""
              type={open === false ? "password" : "text"}
              placeholder="Password"
              id="password"
              // onChange={handleChange}
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
               rows='10'
               maxLength="600"
              id="commento"
            //   value={comment}
              className="flex-1"
              // onChange={(e) =>
              //   setFormData({ ...formData, commento: e.target.value })
              // }
            />
            {/* <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              Max 600 caratteri
            </p>
          </div> */}
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Salva dati
            </Button>
        </form>
      </div>
    </div>
  );
}
