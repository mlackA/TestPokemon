


'use client';
import { Button } from '@/components/ui/button';
import { CardWithForm } from '@/components/ComponentsUI/CardComponent';
import { FormComponent } from '@/components/ComponentsUI/FormComponent';
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from '@/components/ui/label';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormMessage } from '@/components/ui/form';
import { formSchema } from '../validators/LoginValidator';
import { useRouter } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

import { title } from 'process';
import { useCallback, useContext, useState } from 'react';
import MetaLayout from '../layout/MetaLayout';
import { error } from 'console';



interface IFormInput {
  email: string;
  password: string;
}

// Define your validation schema






export default function LoginPage() {
  const router = useRouter()
  const form = useForm<IFormInput>({
    resolver: zodResolver(formSchema), // Integrate Zod validation
  });
  const [error, setError] = useState<string>()

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {

    if (data.email !== 'admin@gmail.com' && data.password !== '123456') {
      setError('Usuario o password incorrecto')
    } else {
      const { localStorage } = window
      //This is assuming the token comes from the backend serialized 

      localStorage.setItem('token', data.password)
      router.push('/dashboard')
    }

  };






  return (
    <MetaLayout title='Welcome to pokemon world'  >
      <div className="h-screen w-full flex items-center justify-center" style={{
        backgroundImage: `url('https://static.printler.com/cache/3/0/b/0/3/0/30b030b03300a4a749468fd650de7fd277bc5cea.jpg')`, // Use your imported image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <FormComponent >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-lg space-y-8">
            <CardWithForm label='World of Pokemon' description='The world of the big universe'>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" placeholder="Enter your email" {...field} />

                    {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="flex flex-col space-y-1.5 pt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" {...field} />
                    {/* Display error message if exists */}
                    {errors.password && <FormMessage>{errors.password.message}</FormMessage>}

                  </div>
                )}
              />
              {error && <span className='text-red-400 font-bold'> {error} </span>}

              <div className='flex w-full items-center justify-center pt-8'>
                <Button type="submit" className='w-[250px] md:max-w-[250px]'>Submit</Button>
              </div>



            </CardWithForm>
          </form>


        </FormComponent>

      </div>
    </MetaLayout>







  );
}