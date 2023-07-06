"use client";

import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Select from "./Select";
import { Radious } from "./Radious";
import { userData } from "@/types/userData";
import Swal from "sweetalert2";

const paises = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Ciudad del Vaticano",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guyana",
  "Guinea",
  "Guinea ecuatorial",
  "Guinea-Bisáu",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Islas Salomón",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Palestina",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República de Macedonia",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "República Sudafricana",
  "Ruanda",
  "Rumanía",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Suazilandia",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
];

const gender = ["male", "female", "intersex"];

const UserSchema: z.ZodType<userData> = z.object({
  name: z.string().min(2).nonempty(),
  direccion: z.string().min(2).nonempty(),
  email: z.string().email().nonempty(),
  pais: z.string().nonempty("You have to select a country"),
  gender: z.string({
    invalid_type_error: "Select your gender",
  }),
});

type userFormProps = {
  people: userData[];
  setPeople: Dispatch<SetStateAction<userData[]>>;
  setOpen: (value: boolean) => void;
  id: any;
  editUser: (id: number, data: userData) => void;
  edit: boolean;
  currentFormData: any;
  setCurrentFormData: (value: userData) => void;
};

const UserForm = ({
  people,
  setPeople,
  setOpen,
  id,
  editUser,
  edit,
  currentFormData,
  setCurrentFormData,
}: userFormProps) => {
  const [count, setCount] = useState<number>(1);

  const currentUser = people.find((person) => id === person.id);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: edit ? currentUser?.name : currentFormData.name,
      direccion: edit ? currentUser?.direccion : currentFormData.direccion,
      email: edit ? currentUser?.email : currentFormData.email,
      pais: edit ? currentUser?.pais : currentFormData.pais,
      gender: edit ? currentUser?.gender : currentFormData.gender,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSchema>> = (
    data: userData
  ) => {
    localStorage.setItem("formData", JSON.stringify({ id: count, data }));
    setPeople([
      ...people,
      {
        id: count,
        name: data.name,
        direccion: data.direccion,
        email: data.email,
        pais: data.pais,
        gender: data.gender,
      },
    ]);
    setCount(count + 1);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "User created",
      showConfirmButton: false,
      timer: 1000,
    });

    reset({
      name: "",
      direccion: "",
      email: "",
      pais: "",
      gender: "",
    });
  };

  useEffect(() => {
    setCurrentFormData(getValues());

    return () => {
      setCurrentFormData(getValues());
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <Input
          label='Name'
          type='text'
          placeholder='Your name'
          {...register("name")}
          error={errors.name}
        />
        <Input
          label=' Email'
          type='email'
          placeholder='example@gmail.com'
          {...register("email")}
          error={errors.email}
        />
        <Input
          label='Dirección'
          type='text'
          placeholder='Your direction'
          {...register("direccion")}
          error={errors.direccion}
        />
        <Select
          {...register("pais")}
          label='Pais'
          placeholder='Select a country'
          error={errors.pais}
          options={paises}
          width='full'
        />
        <div className='flex flex-col p-3'>
          <p className='text-black text-base'>Gender</p>
          {gender.map((e) => (
            <Radious key={e} label={e} value={e} {...register("gender")} />
          ))}
          {errors.gender && (
            <p className='text-red-600 pt-1'>{errors.gender.message}</p>
          )}
        </div>

        <div className='float-right'>
          <button
            type='button'
            className='mx-3 my-2 right-0 rounded-md bg-white px-3 py-2 text-sm border-violet-600 text-violet-600 shadow-sm ring-1 ring-inset ring-violet-600 hover:bg-gray-50'
            onClick={() => {
              setCurrentFormData({
                name: "",
                direccion: "",
                email: "",
                pais: "",
                gender: "",
              });
              reset({
                name: "",
                direccion: "",
                email: "",
                pais: "",
                gender: "",
              });
              setOpen(false);
            }}
          >
            Cancel
          </button>

          <button
            type={`${edit ? "button" : "submit"}`}
            className='rounded-md bg-violet-600 px-4 py-2 text-sm text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={() => {
              edit
                ? trigger().then((status) => {
                    status && editUser(id, getValues());
                  })
                : null;
            }}
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
