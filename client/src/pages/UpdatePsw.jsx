import { Alert, Button, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePsw() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { pswId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPsw = async () => {
        const res = await fetch(`/api/psw/getpsws?pswId=${pswId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.psws[0]);
        }
      };
      fetchPsw();
    } catch (error) {
      console.log(error.message);
    }
  }, [pswId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/psw/updatepsw/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
        // return;
      }
    } catch (error) {
      setPublishError("Qualcosa e' andato storto");
    }
  };
  return (
    <div className="min-h-screen mt-16">
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center text-3xl my-7 font-serif">
          Modulo: Aggiorna voce
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
              value={formData.title}
            />
            <Select
              className="font-serif"
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
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
              value={formData.email}
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
              value={formData.password}
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
            className="flex-1 font-serif"
            onChange={(e) =>
              setFormData({ ...formData, commento: e.target.value })
            }
            value={formData.commento}
          />
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            type="submit"
            className="font-serif"
          >
            Aggiorna dati
          </Button>
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
