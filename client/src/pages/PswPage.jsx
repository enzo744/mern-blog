import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function PswPage() {
  const { pswSlug } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [psw, setPsw] = useState(null);

  useEffect(() => {
    const fetchPsw = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/psw/getpsws?slug=${pswSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPsw(data.psws[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPsw();
  }, [pswSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {psw && psw.title}
      </h1>

      <div className="mt-5 flex flex-row gap-4 p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-md font-serif items-center">
        <Link to="/dashboard?tab=psws">
          <Button 
            outline gradientDuoTone="pinkToOrange" 
            type="submit">
            <HiOutlineArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        
          <span>{psw && new Date(psw.updatedAt).toLocaleDateString()}</span>
          <span className="uppercase">{psw && psw.category}</span>
          <span>{psw && psw.email}</span>
        
        <div
          className="font-serif p-3 max-w-2xl mx-auto w-full"
          dangerouslySetInnerHTML={{ __html: psw && psw.content }}
          
        ></div>
      </div>
    </main>
  );
}
