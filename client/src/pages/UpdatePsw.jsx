import { Alert, Button, Select, TextInput} from "flowbite-react";
import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiOutlineArrowLeft } from "react-icons/hi";

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
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-serif">Aggiorna voce</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                <AiFillEye onClick={toggle} className="cursor-pointer"/>
              ) : (
                <AiFillEyeInvisible onClick={toggle} className="cursor-pointer"/>
              )}
            </div>
          </div>

          <ReactQuill 
            theme="snow"
            value={formData.content}
            placeholder="Scrivi qualcosa..."
            className="h-72 mb-12 color: text-blue-700 dark:text-gray-200"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <div className="flex flex-row gap-4">
          <Link to="/dashboard?tab=psws">
              <Button outline
              gradientDuoTone="pinkToOrange"
              type="submit"
              >
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <Button
              type="submit"
              gradientDuoTone="redToYellow"
              outline
              // className="font-serif w-full"
            >
              Aggiorna dati
            </Button>
          </div>
          {publishError && (
            <Alert className="mt-4" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
    </div>
  );
}
