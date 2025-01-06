import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/auth/authSlice'; 

const RegistrationSchema = z.object({
    firstName: z
        .string()
        .regex(/^[آ-ی]+$/, "فقط حروف فارسی مجاز است")
        .nonempty("این فیلد ضروری است"),
    lastName: z
        .string()
        .regex(/^[آ-ی]+$/, "فقط حروف فارسی مجاز است")
        .nonempty("این فیلد ضروری است"),
    phoneNumber: z
        .string()
        .regex(/^09\d{9}$/, "شماره موبایل باید معتبر باشد")
        .nonempty("این فیلد ضروری است"),
    password: z
        .string()
        .min(4, "رمز عبور باید حداقل ۴ حرف داشته باشد")
        .max(10, "رمز عبور باید حداکثر ۱۰ حرف داشته باشد")
        .regex(/[A-Z]/, "باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
        .regex(/[a-z]/, "باید حداقل یک حرف کوچک انگلیسی داشته باشد"),
});

type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

const RegistrationPage: React.FC = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm<RegistrationFormValues>({
        resolver: zodResolver(RegistrationSchema),
    });

    const onSubmit = (data: RegistrationFormValues) => {
        dispatch(setUserData(data)); // Save user data to Redux
        window.location.href = "/"; // Redirect after successful registration
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
            <h1 className="text-center text-2xl font-bold">ثبت نام</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <input
                        {...register("firstName")}
                        placeholder="نام"
                        className="border border-gray-300 rounded-md p-2 text-right"
                    />
                    {formState.errors.firstName && (
                        <p className="text-red-500 text-sm">{formState.errors.firstName.message}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <input
                        {...register("lastName")}
                        placeholder="نام خانوادگی"
                        className="border border-gray-300 rounded-md p-2 text-right"
                    />
                    {formState.errors.lastName && (
                        <p className="text-red-500 text-sm">{formState.errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col">
                <input
                    {...register("phoneNumber")}
                    placeholder="شماره موبایل"
                    className="border border-gray-300 rounded-md p-2 text-right"
                />
                {formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{formState.errors.phoneNumber.message}</p>
                )}
            </div>

            <div className="flex flex-col">
                <input
                    {...register("password")}
                    type="password"
                    placeholder="رمز عبور"
                    className="border border-gray-300 rounded-md p-2 text-right"
                />
                {formState.errors.password && (
                    <p className="text-red-500 text-sm">{formState.errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full sm:w-auto bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition mt-4 sm:ml-auto"
            >
                ثبت نام
            </button>
        </form>
    );
};

export default RegistrationPage;
