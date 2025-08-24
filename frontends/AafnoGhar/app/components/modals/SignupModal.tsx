'use client'

import Modal from "./Modal";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => { 
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const signupModal = useSignupModal();

    const submitSignup = async (e?: React.FormEvent) => {
        e?.preventDefault(); // Prevent form default submission
        setIsLoading(true);
        setErrors([]); // Clear previous errors

        const formData = {
            name: name,
            email: email,
            password1: password1,
            password2: password2,
        };

        try {
            const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData)); 

            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                signupModal.close();
                router.refresh();
            } else {
                // Handle validation errors
                const tmpErrors: string[] = [];
                
                // Process errors properly
                Object.keys(response).forEach((key) => {
                    const errorValue = response[key];
                    if (Array.isArray(errorValue)) {
                        // If it's an array of errors, add each one
                        tmpErrors.push(...errorValue);
                    } else if (typeof errorValue === 'string') {
                        // If it's a string, add it directly
                        tmpErrors.push(errorValue);
                    }
                });

                setErrors(tmpErrors);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            
            // Handle different types of errors
            if (error.response?.data) {
                const errorData = error.response.data;
                const tmpErrors: string[] = [];
                
                Object.keys(errorData).forEach((key) => {
                    const errorValue = errorData[key];
                    if (Array.isArray(errorValue)) {
                        tmpErrors.push(...errorValue);
                    } else if (typeof errorValue === 'string') {
                        tmpErrors.push(errorValue);
                    }
                });
                
                setErrors(tmpErrors.length > 0 ? tmpErrors : ['Registration failed. Please try again.']);
            } else {
                setErrors(['Network error. Please try again.']);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to AafnoGhar, please sign up</h2>
            <form 
                onSubmit={submitSignup}
                className="space-y-4"
            > 
                <input 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />

                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />

                <input 
                    onChange={(e) => setPassword1(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    value={password1}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />
                
                <input 
                    onChange={(e) => setPassword2(e.target.value)} 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={password2}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />
                
                {errors.length > 0 && (
                    <div className="space-y-2">
                        {errors.map((error, index) => (
                            <div 
                                key={`error_${index}`}
                                className="p-3 bg-red-500 text-white rounded-xl"
                            >
                                {error}
                            </div>
                        ))}
                    </div>
                )}  

                <CustomButton 
                    label={isLoading ? "Signing up..." : "Submit"}
                    onClick={submitSignup}
                    // disabled={isLoading}
                />
            </form>
        </>
    );

    return (
        <Modal 
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content} 
        />
    );
};

export default SignupModal;