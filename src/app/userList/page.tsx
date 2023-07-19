"use client";

import React, { useState } from "react";
import SideBar from "@/components/SideBar";
import UserForm from "@/components/UserForm";
import { UserTable } from "@/components/UserTable";
import { userData } from "@/types/userData";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const defaultUser = {
  name: "",
  direccion: "",
  email: "",
  pais: "",
  gender: "",
};

const userList = () => {
  const [open, setOpen] = useState(true);
  const [people, setPeople] = useState<userData[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const editUser = (id: number, data: userData) => {
    const peopleCopy = [...people];
    const index = peopleCopy.findIndex((person) => person.id === id);

    peopleCopy[index] = {
      id: people[index].id,
      name: data.name,
      direccion: data.direccion,
      email: data.email,
      pais: data.pais,
      gender: data.gender,
    };

    setPeople(peopleCopy);
  };

  const deleteUserById = (id: number) => {
    const peopleCopy = people.filter((people) => people.id != id);

    setPeople(peopleCopy);
  };

  const closeSidebar = () => setOpen(false)


  const currentUser = people.find((person) => id === person.id);

  const defaultValues = {
    name: edit ? currentUser?.name : '',
    address: edit ? currentUser?.address : '',
    email: edit ? currentUser?.email : '',
    country: edit ? currentUser?.country : '',
    gender: edit ? currentUser?.gender : '',
  }

  return (
    <div className='bg-white h-screen'>
      <div className='w-full'>
        {open && (
          <SideBar
            open={true}
            onClose={closeSidebar}
            title={`${edit ? "User edit" : "User registration"}`}
          >
            <UserForm
              people={people}
              setPeople={setPeople}
              onCancel={closeSidebar}
              edit={edit}
              editUser={editUser}
              id={id}
              defaultValues={defaultValues}
            />
          </SideBar>
        )}

        <div className={`${open && "blur-sm"}`}>
          <div className={`bg-white w-full border-b-2 flex justify-between`}>
            <h1 className='text-3xl font-semibold text-black py-6 px-8'>
              Registered users
            </h1>

            <Menu
              as='div'
              className='relative text-left flex items-center mr-6'
            >
              <div>
                <button
                  className='flex items-center rounded-full text-black hover:text-gray-600'
                  onClick={() => {
                    setOpen(true);
                    setEdit(false);
                  }}
                >
                  <span className='sr-only'>Open options</span>
                  <EllipsisVerticalIcon
                    className='h-10 w-10'
                    aria-hidden='true'
                  />
                </button>
              </div>
            </Menu>
          </div>

          <UserTable
            people={people}
            setOpen={setOpen}
            setId={setId}
            setEdit={setEdit}
            deleteUserById={deleteUserById}
          />
        </div>
      </div>
    </div>
  );
};

export default userList;
