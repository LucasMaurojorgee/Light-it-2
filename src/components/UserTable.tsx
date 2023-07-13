"use clien";

import { userData } from "@/types/userData";
import Image from "next/image";
import userImg from "../../public/user.png";
import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "react-query";

type tableProps = {
  people: Array<userData>;
  setOpen: (value: boolean) => void;
  setId: (value: number) => void;
  setEdit: (value: boolean) => void;
  deleteUserById: (id: number) => void;
};

const getUsers = async () => {
  const { data } = await axios.get<userData[]>("http://localhost:4000/users");

  return data;
};

export const UserTable = ({
  people,
  setOpen,
  setId,
  setEdit,
  deleteUserById,
}: tableProps) => {
  let count = 2;

  const { data } = useQuery("users", getUsers);

  return (
    <div className=" flow-root w-full">
      <div>
        <div className="inline-block min-w-full align-middle">
          <table className="w-full divide-y divide-gray-300">
            <thead>
              <tr className="text-center">
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] sm:pl-0 py-4"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Direction
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Country
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-[#949599] py-4"
                >
                  Other
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {people.map((person) => (
                <tr
                  className={`text-center ${
                    count % 2 === 0
                      ? count++ && "bg-[#F9FAFB]"
                      : count++ && "bg-white"
                  }`}
                >
                  <td className="text-sm font-medium text-black sm:pl-0 py-8  flex items-center justify-center">
                    <Image
                      src={userImg}
                      alt="user image"
                      width={36}
                      height={36}
                      className="mr-3"
                    />
                    {person.name}
                  </td>
                  <td className="text-black">{person.direccion}</td>
                  <td className="text-black">{person.email}</td>
                  <td className="text-black">{person.pais}</td>
                  <td className="text-black">{person.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        setOpen(true);
                        person.id && setId(person.id);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="flex justify-center">
                    <TrashIcon
                      className="text-black w-9 h-9 cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire(
                              "User deleted!",
                              "User has been deleted.",
                              "success"
                            );

                            person.id && deleteUserById(person.id);
                          }
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
