import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/auth/authSlice";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(RegistrationSchema),
    });

    const onSubmit = (data: RegistrationFormValues) => {
        dispatch(setUserData(data));
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-center md:text-right text-2xl font-bold mb-4">ثبت نام</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
                <div className="sm:order-last">
                    <InputField
                        type="text"
                        placeholder="نام"
                        error={errors.firstName}
                        {...register("firstName")}
                    />
                </div>
                <div className="sm:order-first">
                    <InputField
                        type="text"
                        placeholder="نام خانوادگی"
                        error={errors.lastName}
                        {...register("lastName")}
                    />
                </div>
            </div>

            <InputField
                placeholder="شماره موبایل"
                type="tel"
                error={errors.phoneNumber}
                {...register("phoneNumber")}
            />

            <InputField
                type="password"
                placeholder="رمز عبور"
                {...register("password")}
            />

            <Button type="submit">ثبت نام</Button>
        </form>
    );
};

export default RegistrationPage;
