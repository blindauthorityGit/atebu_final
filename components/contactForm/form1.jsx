import React, { useState } from "react";
import MainContainer from "../layout/mainContainer";
import { useForm } from "react-hook-form";
import Error from "./error";
import axios from "axios";
import { Rings } from "react-loader-spinner";

const Form1 = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    async function onSubmitForm(values) {
        console.log(values);
        setLoading(true);
        let config = {
            method: "post",
            // url: `http://localhost:3000/api/contact`,
            url: `/api/contact`,
            headers: {
                "Content-Type": "application/json",
            },
            data: values,
        };

        try {
            const response = await axios(config);
            setLoading(false);
            setSuccess(true);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <MainContainer width=" sm:pt-4 sm:pb-12  relative ">
            <div className="col-span-12  grid grid-cols-12">
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid gap-2 grid-cols-12 footer topKontakt sm:gap-4 "
                    action=""
                >
                    <div className="hidden">
                        <label htmlFor="firstName">Name</label>
                        <input
                            {...register("firstName", { required: false })}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="off"
                        />
                    </div>
                    <input
                        {...register("name", { required: true })}
                        id="name"
                        className="col-span-12 border-b border-primaryColor bg-transparent text-primaryColor-200 placeholder-primaryColor-200 p-4"
                        type="text"
                        placeholder="Name"
                    />
                    {errors.name && <Error klasse="col-span-12">Bitte geben Sie Ihren vollen Namen an</Error>}

                    <input
                        {...register("email", { required: true })}
                        name="email"
                        id="email"
                        className="col-span-12 lg:col-span-6 border-b border-primaryColor bg-transparent text-primaryColor-200 placeholder-primaryColor-200  p-4"
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && <Error klasse="col-span-12 lg:col-span-6">Bitte geben Sie Ihre Email an</Error>}

                    <input
                        {...register("phone", { required: true })}
                        name="phone"
                        id="phone"
                        className="col-span-12 lg:col-span-6 border-b border-primaryColor bg-transparent text-primaryColor-200 placeholder-primaryColor-200 p-4"
                        type="text"
                        placeholder="Telefonnummer"
                    />
                    {errors.phone && (
                        <Error klasse="col-span-12 lg:col-span-6">Bitte geben Sie Ihre Telefonnummer an</Error>
                    )}

                    <textarea
                        {...register("message", { required: true })}
                        className="col-span-12 border border-primaryColor bg-transparent text-primaryColor-200  placeholder-primaryColor-200 p-4"
                        name="message"
                        id="message"
                        cols="20"
                        rows="7"
                        placeholder="Nachricht"
                    ></textarea>
                    {errors.message && <Error klasse="block col-span-12">Bitte geben Sie Ihre Nachricht an</Error>}

                    <div className="check col-span-12 mt-6">
                        <input
                            {...register("checkbox", { required: true })}
                            id="checkbox"
                            className="mr-4 text-primaryColor"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox" className="text-primaryColor-200 text-xs sm:text-sm">
                            Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zum Zweck der
                            Kontaktaufnahme zu. *
                        </label>
                        {errors.checkbox && <Error klasse="block col-span-12">Bitte bestätigen</Error>}
                    </div>
                    {loading ? (
                        <div className="w-96 flex justify-center">
                            <Rings
                                height="80"
                                width="80"
                                color="#a53f98"
                                radius="6"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="rings-loading"
                            />
                        </div>
                    ) : (
                        <div className="w-full col-span-12">
                            <button
                                className="group w-full bg-primaryColor text-white  ease-in-out duration-200 hover:bg-darkGrey cursor-pointer p-4 flex items-center justify-center mt-8 sm:mt-4 mb-12 sm:mb-0 hover:bg-primaryColor hover:text-white border  text-blackText"
                                type="submit"
                            >
                                Absenden
                            </button>
                        </div>
                    )}
                </form>
                {success ? <div className="text-primaryColor w-96 mt-4">Vielen Dank für Ihre Nachricht!</div> : ""}
            </div>
            <div className="col-span-12 lg:col-span-4 grid grid-cols-12">{props.children}</div>
        </MainContainer>
    );
};

export default Form1;
