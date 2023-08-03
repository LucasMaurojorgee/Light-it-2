"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import UserForm from "@/components/UserForm";
import { UserTable } from "@/components/UserTable";
import { User } from "@/types/User";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { UserData } from "@/types/UserData";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormValues } from "@/components/UserForm";

const getUsers = async () => {
  const { data } = await axios.get<User[]>("http://localhost:4000/users");

  return data;
};

const postUser = async (data: UserData): Promise<void> => {
  await axios.post("http://localhost:4000/users", data);
};

// Arme la interfaz pero no es necesario (Depende el caso, en este son solo 2 props)
interface UpdateUserProps {
  id: number;
  data: UserData;
}

// Después de verlo un poco más a detalle resulta que no podes enviar más de una prop en las mutaciones
// Entonces solo parseamos los datos y los enviamos 👍🏻
const updateUser = async ({ id, data }: UpdateUserProps): Promise<void> => {
  await axios.put(`http://localhost:4000/users/${id}`, data);
};

// No fue un error pero cambié de userList => UserList, por convención siempre con mayúscula la primera letra
const UserList = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const editingUser = data?.find((person: User) => id === person.id);

  const { data, isLoading } = useQuery("users", getUsers);

  const { mutate: postMutation } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Quedo igual, 0 drama acá
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = (data: UserData) => {
    edit ? updateMutation({ id, data }) : postMutation(data);
  };

  const closeSidebar = () => setOpen(false);

  const defaultValues = {
    name: editingUser?.name ?? "",
    address: editingUser?.address ?? "",
    email: editingUser?.email ?? "",
    country: editingUser?.country ?? "",
    gender: editingUser?.gender ?? "",
  };

  const queryClient = useQueryClient();

  return (
    <div className="bg-white h-screen">
      <div className="w-full">
        <SideBar
          open={open}
          onClose={closeSidebar}
          title={`${!!editingUser ? "User edit" : "User registration"}`}
        >
          {open && (
            <UserForm
              onCancel={closeSidebar}
              edit={!!editingUser}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
            />
          )}
        </SideBar>

        <div className={`${open && "blur-sm"}`}>
          <div className={`bg-white w-full border-b-2 flex justify-between`}>
            <h1 className="text-3xl font-semibold text-black py-6 px-8">
              Registered users
            </h1>

            <Menu
              as="div"
              className="relative text-left flex items-center mr-6"
            >
              <div>
                <button
                  className="flex items-center rounded-full text-black hover:text-gray-600"
                  onClick={() => {
                    setOpen(true);
                    setId(0);
                  }}
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-10 w-10"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Menu>
          </div>

          <UserTable
            data={data}
            isLoading={isLoading}
            onEdit={(id) => {
              setId(id);
              setOpen(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
