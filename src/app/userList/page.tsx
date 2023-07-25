"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import UserForm from "@/components/UserForm";
import { UserTable } from "@/components/UserTable";
import { User } from "@/types/User";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { UserData } from "@/types/UserData";
import { SubmitHandler } from "react-hook-form";
import { UserFormValues } from "@/components/UserForm";

const getUsers = async () => {
  const { data } = await axios.get<User[]>("http://localhost:4000/users");

  return data;
};

const postUser = async (data: UserData): Promise<void> => {
  await axios.post("http://localhost:4000/users", data);
};

const updateUser = async (id: number, data: UserData): Promise<void> => {
  await axios.put(`http://localhost:4000/users/${id}`, data);
};

const userList = () => {
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    setOpen(false);
  }, []);

  const { data } = useQuery("users", getUsers);

  const { mutate: postMutation } = useMutation({
    mutationFn: postUser,
    mutationKey: "2",
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updateUser,
    mutationKey: "1",
  });

  const onSubmit: SubmitHandler<UserFormValues> = (data: UserData) => {
    edit ? updateMutation(id, data) : postMutation(data);
  };

  const closeSidebar = () => setOpen(false);

  const currentUser = data?.find((person: User) => id === person.id);

  const defaultValues = {
    name: (edit ? currentUser?.name : "") ?? "",
    address: (edit ? currentUser?.address : "") ?? "",
    email: (edit ? currentUser?.email : "") ?? "",
    country: (edit ? currentUser?.country : "") ?? "",
    gender: (edit ? currentUser?.gender : "") ?? "",
  };

  return (
    <div className="bg-white h-screen">
      <div className="w-full">
        {open && (
          <SideBar
            open={true}
            onClose={closeSidebar}
            title={`${edit ? "User edit" : "User registration"}`}
          >
            <UserForm
              onCancel={closeSidebar}
              edit={edit}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
            />
          </SideBar>
        )}

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
                    setEdit(false);
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
            setOpen={setOpen}
            setId={setId}
            setEdit={setEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default userList;
