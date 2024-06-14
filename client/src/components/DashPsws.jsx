import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPsws() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPsws, setUserPsws] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pswIdToDelete, setPswIdToDelete] = useState("");
  useEffect(() => {
    const fetchPsws = async () => {
      try {
        const res = await fetch(`/api/psw/getpsws?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPsws(data.psws);
          if (data.psws.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPsws();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPsws.length;
    try {
      const res = await fetch(
        `/api/psw/getpsws?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPsws((prev) => [...prev, ...data.psws]);
      }
      if (data.psws.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePsw = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/psw/deletepsw/${pswIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPsws((prev) => prev.filter((psw) => psw._id !== pswIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPsws.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Data Aggiornamento</Table.HeadCell>
              <Table.HeadCell>Titolo</Table.HeadCell>
              <Table.HeadCell>Categoria</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userPsws.map((psw) => (
              <Table.Body className="divide-y" key={psw._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(psw.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-serif text-gray-900 dark:text-white"
                      to={`/psw/${psw.slug}`}
                    >
                      {psw.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{psw.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-teal-600 hover:underline"
                      to={`/update-psw/${psw._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPswIdToDelete(psw._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Elimina
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Mostra altre voci
            </button>
          )}
        </>
      ) : (
        <p>Non ci sono voci</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
              Sicuro di voler eliminare questa voce?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeletePsw} color="failure">
                Si, sono sicuro
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, annulla
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
