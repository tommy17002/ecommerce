import PageTitle from "../components/PageTitle";
import enigmaGrowLogo from "../assets/images/enigma_grow.png";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object ({
    username: z.string().min(1,{message:"Password is required"}),
    password: z.string().min(8, {message:"Password must be at least 8 characters"}),
});

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        login(data.username, data.password);
        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center items-center py-12 sm:px-6 bg-background-gray lg:px-8">
            <PageTitle title="Login" />

            {/* Container for Logo and Title */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-[120px] w-auto"
                    src={enigmaGrowLogo}
                    alt="Enigma Company Logo"
                />
                <h2 className="text-2xl mt-4 text-center font-bold leading-9 tracking-tight text-gray-900">
                    Dashboard Admin Login
                </h2>
            </div>

            {/* Container for Login Form */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)>}>
                            
                        {/* Username Input */}
                        <div>
                            <label

                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                {...register("username")}
                                    type="text"
                                    placeholder="username"
                                    autoComplete="username"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-insert
                             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primar sm:text-sm sm:leading-6"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-insert
                             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primar sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full justify-between rounded-md bg-primar px-3 py-1.5 text-sm font-semibold 
                            leading-6 text-white shadow-sm hover:bg-primar-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            focus-visible:outline-primar">
                                Sing in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage