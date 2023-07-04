"use clien";

import { userData } from "@/types/userData";
import Image from "next/image";
import userImg from "../../public/user.png";

type tableProps = {
  people: Array<userData>;
  setOpen: (value: boolean) => void;
  setId: (value: number) => void;
  setEdit: (value: boolean) => void;
};

export const UserTable = ({ people, setOpen, setId, setEdit }: tableProps) => {
  let count = 2;

  return (
    <div className=' flow-root w-full'>
      <div>
        <div className='inline-block min-w-full align-middle'>
          <table className='w-full divide-y divide-gray-300'>
            <thead>
              <tr className='text-center'>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] sm:pl-0 py-4'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] py-4'
                >
                  Direction
                </th>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] py-4'
                >
                  Email
                </th>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] py-4'
                >
                  Country
                </th>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] py-4'
                >
                  Gender
                </th>
                <th
                  scope='col'
                  className='text-sm font-semibold text-[#949599] py-4'
                >
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 '>
              {people.map((person) => (
                <tr
                  className={`text-center ${
                    count % 2 === 0
                      ? count++ && "bg-[#F9FAFB]"
                      : count++ && "bg-white"
                  }`}
                >
                  <td className='text-sm font-medium text-black sm:pl-0 py-8  flex items-center justify-center'>
                    <Image
                      src={userImg}
                      alt='user image'
                      width={36}
                      height={36}
                      className='mr-3'
                    />
                    {person.name}
                  </td>
                  <td className='text-black'>{person.direccion}</td>
                  <td className='text-black'>{person.email}</td>
                  <td className='text-black'>{person.pais}</td>
                  <td className='text-black'>{person.gender}</td>
                  <td>
                    <button
                      type='button'
                      className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      onClick={() => {
                        setOpen(true);
                        person.id && setId(person.id);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </button>
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
