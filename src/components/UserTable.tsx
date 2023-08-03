"use clien";

import { User } from "@/types/User";
import Image from "next/image";
import userImg from "../../public/user.png";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type tableProps = {
  data?: User[];
  onEdit: (id: number) => void;
  isLoading: boolean;
};

const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:4000/users/${id}`);
};

export const UserTable = ({ data, onEdit }: tableProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

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
              {data?.map((person, count) => (
                <tr
                  className={`text-center ${
                    count % 2 === 0
                      ? "bg-[#F9FAFB]"
                      : "bg-white"
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
                  <td className="text-black">{person.address}</td>
                  <td className="text-black">{person.email}</td>
                  <td className="text-black">{person.country}</td>
                  <td className="text-black">{person.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        onEdit(person.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="flex justify-center">
                    <TrashIcon
                      className="text-black w-9 h-9 cursor-pointer"
                      onClick={() => {
                        deleteMutation(person.id);
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
